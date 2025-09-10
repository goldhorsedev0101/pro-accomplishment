import { corsOptions, response, supabasePromiseResolver, verifyToken } from '@/lib/supabase/helper';
import { getSubCategories } from '@/services/server/categoryService';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

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
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
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
