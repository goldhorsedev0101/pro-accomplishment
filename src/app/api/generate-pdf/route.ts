/* eslint-disable */

import { response } from '@/lib/supabase/helper';
import chromium from '@sparticuz/chromium-min';
import { createClient } from '@supabase/supabase-js';
import { NextRequest } from 'next/server';
import path from 'path';
import puppeteer, { Browser } from 'puppeteer-core';

import fs from 'fs/promises';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

// Launch Chromium
async function launchChromium(): Promise<Browser> {
  const isServerless = Boolean(process.env.AWS_REGION || process.env.VERCEL);
  return puppeteer.launch({
    executablePath: isServerless
      ? await chromium.executablePath(
          'https://github.com/Sparticuz/chromium/releases/download/v129.0.0/chromium-v129.0.0-pack.tar',
        )
      : // : '/usr/bin/google-chrome',
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    // TODO: Remove local path when deploying edge function.
    // executablePath: await chromium.executablePath(
    //   "https://github.com/Sparticuz/chromium/releases/download/v129.0.0/chromium-v129.0.0-pack.tar"
    // ),
    args: isServerless ? [...chromium.args, '--no-sandbox'] : [],
    headless: true,
  });
}

// async function getFileText(bucket: string, filePath: string): Promise<string> {
//   const isLocal = false;
//   if (isLocal) {
//     const localPath = path.join(process.cwd(), 'public', 'template', path.basename(filePath));
//     return await fs.readFile(localPath, 'utf-8');
//   }
//   const { data, error } = await supabase.storage.from(bucket).download(filePath);
//   if (error) throw error;
//   return await data.text();
// }
async function getFileText(bucket: string, filePath: string): Promise<string> {
  const localPath = path.join(process.cwd(), 'public', 'template', filePath);
  return await fs.readFile(localPath, 'utf-8');
}

async function getFinalHtml(folioData: any) {
  const [template, css, js] = await Promise.all([
    getFileText('pdf-template', 'template.html'),
    getFileText('pdf-template', 'styles.css'),
    getFileText('pdf-template', 'script.js'),
  ]);
  let html = template;
  html = html.replace(`<link rel="stylesheet" href="styles.css" />`, `<style>${css}</style>`);
  html = html.replace(
    `<script src="script.js" defer></script>`,
    `<script>window.__FOLIO_DATA__ = ${JSON.stringify({
      candidate_data: folioData?.data?.candidate_data,
      accomplishments: folioData?.data?.accomplishments,
    })};</script><script>${js}</script>`,
  );
  return html;
}

async function getFolioDocument(folioId: string) {
  const { data, error } = await supabase.rpc('get_folio_without_pagination', {
    p_folio_id: folioId,
  });
  if (error) {
    console.error('get_folio_without_pagination RPC error: ', error);
    throw error;
  }
  if (!data) {
    throw new Error('No document found for the given folio ID.');
  }
  return data;
}

function generateRandomNumberString(length: number) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10).toString();
  }
  return result;
}

export async function POST(request: NextRequest) {
  const { folio_id } = await request.json();
  let browser: Browser | null = null;

  // base log data
  const logData: any = {
    folio_id: folio_id ?? null,
    profile_id: null,
    candidate_id: null,
    email: null,
    message: null,
  };

  try {
    // 1. Get folio row from table (for pdf_url + candidate_id)
    const { data: folioRow, error: folioRowError } = await supabase
      .from('folio')
      .select('*')
      .eq('id', folio_id)
      .single();

    if (folioRowError || !folioRow) {
      throw new Error('Folio not found');
    }

    // delete old file if exists
    if (folioRow.pdf_url) {
      const { error: updateError } = await supabase
        .from('folio')
        .update({ pdf_url: null, updated_at: new Date().toISOString() })
        .eq('id', folio_id);
      if (updateError) {
        throw new Error(`Failed to clear pdf_url: ${updateError.message}`);
      }
      const oldPath = folioRow.pdf_url.split('/generated-folios/')[1];
      if (oldPath) {
        await supabase.storage.from('generated-folios').remove([oldPath]);
      }
    }

    // 2. Get detailed folio data via RPC (for HTML)
    const folioData = await getFolioDocument(folio_id);
    const candidate = folioData?.data?.candidate_data;

    logData.profile_id = candidate?.profile_id ?? null;
    logData.candidate_id = candidate?.candidate_id ?? null;
    logData.email = candidate?.email ?? null;

    // 3. Generate PDF
    const candidateName = candidate?.first_name?.replaceAll(' ', '-') || 'Anonymous';

    browser = await launchChromium();
    const page = await browser.newPage();
    const html = await getFinalHtml(folioData);
    await page.setContent(html, { waitUntil: 'load' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    // 4. Upload new PDF
    const fileName = `${candidateName}-${generateRandomNumberString(20)}.pdf`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('generated-folios')
      .upload(fileName, new Uint8Array(pdfBuffer), {
        contentType: 'application/pdf',
        upsert: true,
      });

    if (uploadError) throw uploadError;

    const publicUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/generated-folios/${uploadData?.path}`;

    // 5. Update folio row with new pdf_url
    const { error: updateError } = await supabase
      .from('folio')
      .update({ pdf_url: publicUrl, updated_at: new Date().toISOString() })
      .eq('id', folio_id);

    if (updateError) throw updateError;

    // success log
    logData.message = 'PDF generated and stored successfully';
    const { data, error } = await supabase.from('folio_pdf_generation_log').insert([logData]);

    return response(
      {
        data: { publicUrl },
        message: logData.message,
        error: null,
      },
      200,
    );
  } catch (error) {
    console.error('PDF generation/upload failed:', error);

    logData.message = (error as Error).message || 'Unknown error';
    await supabase.from('folio_pdf_generation_log').insert([logData]);

    return response(
      {
        data: null,
        message: logData?.message,
        error: error,
      },
      500,
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
