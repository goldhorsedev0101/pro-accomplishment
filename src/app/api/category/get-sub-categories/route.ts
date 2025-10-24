import { corsOptions, response, supabasePromiseResolver } from '@/lib/supabase/helper';
import { authGuard } from '@/services/server/authGuard';
import { getSubCategories } from '@/services/server/categoryService';

import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function OPTIONS() {
  return corsOptions();
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    if (!categoryId) {
      return response(
        {
          message: 'Category ID is required.',
          data: null,
          error: 'Missing categoryId parameter.',
        },
        400,
      );
    }

    const { errorResponse } = await authGuard(request);
    if (errorResponse) return errorResponse;

    const getSubCategoriesResponse = await supabasePromiseResolver({
      requestFunction: getSubCategories,
      requestBody: { categoryId },
    });

    if (!getSubCategoriesResponse?.success) {
      return response(
        {
          message: getSubCategoriesResponse?.error || 'Failed to retrieve sub categories.',
          data: null,
          error: getSubCategoriesResponse?.error || 'Failed to retrieve sub categories.',
        },
        400,
      );
    }

    if (!getSubCategoriesResponse?.data || getSubCategoriesResponse?.data.length === 0) {
      return response(
        {
          message: 'No sub categories found for this category.',
          data: null,
          error: 'No sub categories found.',
        },
        404,
      );
    }

    return response(
      {
        message: 'Sub categories retrieved successfully.',
        data: getSubCategoriesResponse?.data || null,
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
