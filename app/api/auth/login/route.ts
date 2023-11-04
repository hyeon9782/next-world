import { loginAPI } from '@/api/user';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const res = await loginAPI(body);

    const response = NextResponse.json({
      message: 'Login successfull',
      success: true,
      user: res.user,
    });

    response.cookies.set('token', res.user.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });

    return response;
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
