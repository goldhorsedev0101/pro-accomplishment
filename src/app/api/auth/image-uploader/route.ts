import { corsOptions, response } from '@/lib/supabase/helper';
import { uploadProfilePicture } from '@/services/server/authService';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 60;
export const config = {
  api: {
    bodyParser: false,
    sizeLimit: '10mb',
  },
};

export async function OPTIONS() {
  return corsOptions();
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const oldUrl = formData.get('oldUrl') as string | null;

    if (!file) {
      return response({ error: 'File is required', message: 'No file uploaded', data: null }, 400);
    }

    const { error, data } = await uploadProfilePicture({
      oldUrl: oldUrl ?? undefined,
      file,
    });

    if (error) {
      return response({ error, message: 'Failed to upload profile picture', data: null }, 400);
    }

    return response(
      {
        error: null,
        message: 'Profile picture uploaded successfully',
        data,
      },
      200,
    );
  } catch (error) {
    return response(
      {
        error: (error as Error)?.message,
        message: 'Internal Server Error',
        data: null,
      },
      500,
    );
  }
}
