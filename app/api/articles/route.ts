import { getArticlesAPI, getArticlesWithFavoritedAPI } from '@/services/articles';
import { getToken } from '@/utils/cookies';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = searchParams.get('page');
    const username = searchParams.get('username');

    const token = getToken(request);

    if (username) {
      const { articles, articlesCount } = await getArticlesWithFavoritedAPI(username, token, Number(page));
      return NextResponse.json({ articles, articlesCount });
    }

    const { articles, articlesCount } = await getArticlesAPI(token, Number(page));
    return NextResponse.json({ articles, articlesCount });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
