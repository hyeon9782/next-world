import { favoriteArticle, unFavoriteArticle } from '@/services/articles';
import { getToken } from '@/utils/cookies';
import { NextRequest, NextResponse } from 'next/server';

// 좋아요
async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json();
    const token = request.cookies.get('token')?.value || '';

    // const res = await http.post(`/articles/${slug}/favorite`, '', {
    //   headers: {
    //     'Content-Type': 'application/json; charset=utf-8',
    //     Authorization: `Token ${token}`,
    //   },
    // });

    const res = await favoriteArticle(slug, token);

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
    // const res = await http.delete(`/articles/${slug}/favorite`, {
    //   headers: {
    //     'Content-Type': 'application/json; charset=utf-8',
    //     Authorization: `Token ${token}`,
    //   },
    // });

    const res = await unFavoriteArticle(slug, token);

    return NextResponse.json({ message: 'Un Favorite Success', success: true, data: res });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export { POST, DELETE };
