import { getUserAPI, updateUserAPI } from '@/api/user';
import { getToken } from '@/utils/cookies';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const token = getToken(request);

    const { user } = await getUserAPI(token);

    return NextResponse.json({
      message: 'Login successfull',
      success: true,
      user,
    });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = getToken(request);
    const user = await request.json();

    return updateUserAPI(user, token);
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
