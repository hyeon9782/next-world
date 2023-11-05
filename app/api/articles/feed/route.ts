import { getArticlesFeedAPI } from '@/api/articles';
import { getToken } from '@/utils/cookies';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = searchParams.get('page');

    const token = getToken(request);

    const { articles, articlesCount } = await getArticlesFeedAPI(Number(page), token);

    return NextResponse.json({ articles, articlesCount });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
