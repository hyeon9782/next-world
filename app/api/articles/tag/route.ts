import { getArticlesWithTagAPI } from '@/api/articles';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const tag = searchParams.get('tag') || '';
    const page = searchParams.get('page');

    const { articles, articlesCount } = await getArticlesWithTagAPI(tag, Number(page));

    return NextResponse.json({ articles, articlesCount });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
