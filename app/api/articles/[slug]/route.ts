import { deleteArticleAPI, getArticleAPI, updateArticleAPI } from '@/api/articles';
import { getToken } from '@/utils/cookies';
import { NextRequest, NextResponse } from 'next/server';

async function GET(request: NextRequest, route: { params: { slug: string } }) {
  try {
    const slug = route.params.slug;
    const token = getToken(request);

    const res = await getArticleAPI(slug, token);

    return NextResponse.json(
      { message: 'Article Get Success', success: true, data: res },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

async function PUT(request: NextRequest, route: { params: { slug: string } }) {
  try {
    const body = await request.json();
    const slug = route.params.slug;
    const token = getToken(request);

    const res = updateArticleAPI(slug, token, body);

    return NextResponse.json({ message: 'Article Update Success', success: true, data: res });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

async function DELETE(request: NextRequest, route: { params: { slug: string } }) {
  try {
    const slug = route.params.slug;
    const token = getToken(request);

    const res = deleteArticleAPI(slug, token);

    return NextResponse.json({ message: 'Article Delete Success', success: true, data: res });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export { GET, PUT, DELETE };
