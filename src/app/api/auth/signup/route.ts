import { NextRequest, NextResponse } from 'next/server';
// import { supabasePromiseResolver } from '@/lib/supabase/helper';
// import { createProfile, isUserNotExist, signUp } from '@/services/server/authService';

// export const T_ROLE = {
//   candidate: 'candidate',
//   recruiter: 'recruiter',
// };

// export async function POST(request: NextRequest) {
//   try {
//     const { firstName, lastName, email, password } = await request.json();
//     const lowerCased = email.toLowerCase();
//     const isUserNotExistResponse = await supabasePromiseResolver({
//       requestFunction: isUserNotExist,
//       requestBody: { email: lowerCased },
//     });
//     if (!isUserNotExistResponse?.success) {
//       return NextResponse.json({ error: isUserNotExistResponse?.error }, { status: 400 });
//     }
//     const signUpResponse = await supabasePromiseResolver({
//       requestFunction: signUp,
//       requestBody: {
//         email: lowerCased,
//         password,
//       },
//     });
//     if (!signUpResponse?.success) {
//       return NextResponse.json({ error: isUserNotExistResponse?.error }, { status: 400 });
//     }
//     const userId = signUpResponse?.data?.user?.id;
//     const createProfileResponse = await supabasePromiseResolver({
//       requestFunction: createProfile,
//       requestBody: {
//         userId,
//         firstName,
//         lastName,
//         email: lowerCased,
//         role: T_ROLE.recruiter,
//       },
//     });
//     if (!createProfileResponse.success) {
//       return NextResponse.json({ error: isUserNotExistResponse?.error }, { status: 400 });
//     }
//     return NextResponse.json(
//       {
//         message: 'Recruiter created successfully! Please check your email for verification.',
//         data: createProfileResponse?.data?.data,
//       },
//       { status: 200 },
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { error: (error as Error)?.message ?? 'Internal Server Error' },
//       { status: 500 },
//     );
//   }
// }

export async function POST(request: NextRequest) {
  return NextResponse.json(
    {
      message: 'Recruiter created successfully! Please check your email for verification.',
      data: { request },
    },
    { status: 200 },
  );
}
