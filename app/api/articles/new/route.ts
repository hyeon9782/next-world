import { createArticle } from '@/api/articles';
import { getToken } from '@/utils/cookies';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const token = getToken(request);
    const body = await request.json();

    const res = createArticle(token, body);

    return NextResponse.json({ message: 'Create Article Success', success: true, data: res });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
