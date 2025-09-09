import { corsOptions, response, supabasePromiseResolver, verifyToken } from '@/lib/supabase/helper';
import { getCandidates } from '@/services/server/candidatesService';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function OPTIONS() {
  return corsOptions();
}

export async function GET(request: NextRequest) {
  try {
    const accessToken =
      'eyJhbGciOiJIUzI1NiIsImtpZCI6IkVvV29TS0pia05pSTFiVVYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2tsZmpwa3B4Z3J3ZHF2cG96aXpvLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiIzMTRkNzdhMi00MDE3LTRmOTctOGJmMi00NDJjYmYwZGVlMzYiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzU3MzcxNTQxLCJpYXQiOjE3NTczNjc5NDEsImVtYWlsIjoicmVjcnVpdGVyN0B5b3BtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsiZW1haWwiOiJyZWNydWl0ZXI3QHlvcG1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwic3ViIjoiMzE0ZDc3YTItNDAxNy00Zjk3LThiZjItNDQyY2JmMGRlZTM2In0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3NTczNjc5NDF9XSwic2Vzc2lvbl9pZCI6IjIzZDRlNGZiLTRhZmYtNDVjMi04YjJlLWFjMDc0MDc4NWNjYSIsImlzX2Fub255bW91cyI6ZmFsc2V9.xYkuCxz95RZVeecO3N0Pii4LSexUP0yLQPTNGMAoTMw';

    // const cookieStore = await cookies();
    // const accessToken = cookieStore.get('accessToken')?.value;
    const tokenCheck = verifyToken(accessToken);
    if (!tokenCheck.valid) {
      return response(
        {
          message: tokenCheck.error,
          data: null,
          error: tokenCheck.error,
        },
        401,
      );
    }
    const getCandidatesResponse = await supabasePromiseResolver({
      requestFunction: getCandidates,
      requestBody: {
        recruiterId: 'd57b87d7-d16d-4218-83f2-dad847636fec',
        searchTerm: null,
        categoryId: null,
        subCategoryId: null,
        skip: 0,
        take: 5,
      },
    });
    if (!getCandidatesResponse?.success) {
      return response(
        {
          message: getCandidatesResponse?.error || 'Failed to retrieve candidates data.',
          data: null,
          error: getCandidatesResponse?.error || 'Failed to retrieve candidates data.',
        },
        400,
      );
    }
    return response(
      {
        message: getCandidatesResponse?.data?.message || 'Candidates retrieved successfully.',
        data: getCandidatesResponse?.data?.data || {},
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
