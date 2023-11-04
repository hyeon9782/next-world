import { httpClient } from '@/api/http/httpClient';
import { NextRequest, NextResponse } from 'next/server';

async function GET(req: NextRequest, route: { params: { slug: string } }) {
  try {
    const slug = route.params.slug;
    const token = req.cookies.get('token')?.value || '';

    const res = await httpClient.get(`/articles/${slug}/comments`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Token ${token}`,
      },
    });

    return NextResponse.json({ message: 'Comment Get Success', success: true, data: res });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

async function POST(req: NextRequest, route: { params: { slug: string } }) {
  try {
    const body = await req.json();
    const slug = route.params.slug;
    const token = req.cookies.get('token')?.value || '';

    const res = await httpClient.post(`/articles/${slug}/comments`, body, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Token ${token}`,
      },
    });

    return NextResponse.json({ message: 'Comment Create Success', success: true, data: res });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

async function DELETE(req: NextRequest, route: { params: { slug: string } }) {
  try {
    const { searchParams } = new URL(req.url);

    const id = searchParams.get('id');
    const slug = route.params.slug;

    const token = req.cookies.get('token')?.value || '';

    const res = await httpClient.delete(`/articles/${slug}/comments/${id}`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Token ${token}`,
      },
    });

    return NextResponse.json({ message: 'Comment Delete Success', success: true, data: res });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export { GET, POST, DELETE };
