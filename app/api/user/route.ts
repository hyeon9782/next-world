import { getUserAPI, updateUserAPI } from '@/api/user';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value || '';

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

export async function PUT(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value || '';
    const user = await req.json();

    return updateUserAPI(user, token);
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
