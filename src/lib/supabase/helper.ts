export interface ISupabasePromiseResolver {
  requestFunction: (requestBody: any) => Promise<{ data?: any; error?: any }>;
  requestBody: any;
}

export const supabasePromiseResolver = async ({
  requestFunction,
  requestBody,
}: ISupabasePromiseResolver) => {
  try {
    const res = await requestFunction(requestBody);

    if (res?.error) {
      const errorMessage = res.error.message;

      if (errorMessage?.includes('Network request failed.')) {
        return { success: false, error: 'Network Request Error.' };
      }

      switch (res.error.status) {
        case 400:
          return { success: false, data: null, error: errorMessage || 'Bad Request.' };

        case 401:
          return { success: false, data: null, error: errorMessage || 'You are unauthorized.' };

        case 404:
          return { success: false, data: null, error: errorMessage || 'Not Found.' };

        case 409:
          return { success: false, data: null, error: errorMessage || 'Conflict.' };

        case 500:
          return { success: false, data: null, error: errorMessage || 'Internal Server Error.' };

        case 502:
          return { success: false, data: null, error: errorMessage || 'Bad Gateway Error.' };

        case 503:
          return { success: false, data: null, error: errorMessage || 'Server timed out.' };

        default:
          return { success: false, data: null, error: errorMessage || 'Something went wrong.' };
      }
    }
    if (res && res?.data) {
      return {
        success: true,
        data: res?.data,
        error: null,
      };
    }

    if (res?.data?.success && !res?.data?.success) {
      return { success: false, data: null, error: 'Network Request Error.' };
    }

    return { success: false, error: 'Oops! There might be an issue. Please try again.' };
  } catch (error: any) {
    console.error('REQUEST HANDLER ERROR CATCH', error);
    return { success: false, error: error?.message, data: null };
  }
};

import { NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers':
    'X-CSRF-Token, X-Requested-With, Accept, Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true',
};

export const response = (json: any, status = 200) => {
  return NextResponse.json(json, { status, headers: corsHeaders });
};

export function corsOptions() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}
