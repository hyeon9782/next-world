import { favoriteArticleAPI, unFavoriteArticleAPI } from '@/api/articles';
import { getToken } from '@/utils/cookies';
import { NextRequest, NextResponse } from 'next/server';

// 좋아요
async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json();
    const token = getToken(request);

    const res = await favoriteArticleAPI(slug, token);

    return NextResponse.json({ message: 'Favorite Success', success: true, data: res });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

// 좋아요 취소
async function DELETE(request: NextRequest) {
  try {
    const { slug } = await request.json();
    const token = getToken(request);

    const res = await unFavoriteArticleAPI(slug, token);

    return NextResponse.json({ message: 'Un Favorite Success', success: true, data: res });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export { POST, DELETE };
