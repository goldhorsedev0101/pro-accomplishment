import { corsOptions, response, supabasePromiseResolver } from '@/lib/supabase/helper';
import { authGuard } from '@/services/server/authGuard';
import { getCategories } from '@/services/server/categoryService';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function OPTIONS() {
  return corsOptions();
}

export async function GET(request: NextRequest) {
  try {
    const { errorResponse } = await authGuard(request);
    if (errorResponse) return errorResponse;

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
