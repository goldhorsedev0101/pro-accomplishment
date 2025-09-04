// import { supabasePromiseResolver } from '@/lib/supabase/helper';
// import { verifyOtp } from '@/services/server/authService';
import { NextRequest, NextResponse } from 'next/server';

// // type: "signup"|"recovery"

// export async function POST(request: NextRequest) {
//   try {
//     const { otp, email, type } = await request.json();
//     console.log(
//       `\n${new Date().toLocaleTimeString()} \n ~ route.ts:10 ~ POST ~ { otp, email, type }:`,
//       JSON.stringify({ otp, email, type }, null, 2),
//     );
//     if (otp.length !== 6) {
//       return NextResponse.json(
//         { error: 'Please enter the 6-digit OTP code sent to your email.' },
//         { status: 400 },
//       );
//     }
//     const verifyOtpResponse = await supabasePromiseResolver({
//       requestFunction: verifyOtp,
//       requestBody: {
//         email,
//         token: otp,
//         type,
//       },
//     });
//     console.log(
//       `\n${new Date().toLocaleTimeString()} \n ~ route.ts:25 ~ POST ~ verifyOtpResponse:`,
//       JSON.stringify(verifyOtpResponse, null, 2),
//     );
//     if (!verifyOtpResponse?.success) {
//       return NextResponse.json({ error: verifyOtpResponse?.error }, { status: 400 });
//     }

//     return NextResponse.json(
//       {
//         message: 'OTP verified successfully.',
//         data: verifyOtpResponse?.data,
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
