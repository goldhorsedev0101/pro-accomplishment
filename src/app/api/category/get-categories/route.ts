import {
  corsOptions,
  getAccessToken,
  response,
  supabasePromiseResolver,
  verifyToken,
} from '@/lib/supabase/helper';
import { getCategories } from '@/services/server/categoryService';
import { NextRequest } from 'next/server';

export async function OPTIONS() {
  return corsOptions();
}

export async function GET(request: NextRequest) {
  try {
    const accessToken = await getAccessToken(request);
    if (!accessToken) {
      return response(
        {
          message: 'Unauthorized',
          data: null,
          error: 'Unauthorized',
        },
        404,
      );
    }
    const tokenCheckResponse = verifyToken(accessToken);
    if (!tokenCheckResponse?.valid) {
      return response(
        {
          message: tokenCheckResponse.error,
          data: null,
          error: tokenCheckResponse.error,
        },
        401,
      );
    }
    `~`;
    const getCategoriesResponse = await supabasePromiseResolver({
      requestFunction: getCategories,
      requestBody: {},
    });
    if (!getCategoriesResponse?.success) {
      return response(
        {
          message: getCategoriesResponse?.error || 'Failed to retrieve categories.',
          data: null,
          error: getCategoriesResponse?.error || 'Failed to retrieve categories.',
        },
        400,
      );
    }
    return response(
      {
        message: 'Categories retrieved successfully.',
        data: getCategoriesResponse?.data || [],
        error: null,
      },
      200,
    );
  } catch (error) {
    return response(
      {
        message: (error as Error)?.message || 'Internal Server Error.',
        data: null,
        error,
      },
      500,
    );
  }
}
