import { getUserAPI, updateUserAPI } from '@/api/user';
import { getToken } from '@/utils/cookies';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const token = getToken(request);
    const res = await getUserAPI(token);
    return NextResponse.json({ message: 'Success', success: true, data: res });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const token = getToken(request);
    const res = await updateUserAPI(body, token);

    return NextResponse.json({ message: 'Success', success: true, data: res });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
