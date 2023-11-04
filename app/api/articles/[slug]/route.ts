import { httpClient } from '@/api/http/httpClient';
import { NextRequest, NextResponse } from 'next/server';

async function GET(req: NextRequest, route: { params: { slug: string } }) {
  try {
    const slug = route.params.slug;
    const token = req.cookies.get('token')?.value || '';

    const res = await httpClient.get(`/articles/${slug}`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Token ${token}`,
      },
    });

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
    console.log(error);
    return new NextResponse(error.message, { status: 500 });
  }
}

async function PUT(req: NextRequest, route: { params: { slug: string } }) {
  try {
    const body = await req.json();
    const slug = route.params.slug;
    const token = req.cookies.get('token')?.value || '';

    const res = await httpClient.put(`/articles/${slug}`, body, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Token ${token}`,
      },
    });

    return NextResponse.json({ message: 'Article Update Success', success: true, data: res });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

async function DELETE(req: NextRequest, route: { params: { slug: string } }) {
  try {
    const slug = route.params.slug;
    const token = req.cookies.get('token')?.value || '';

    const res = await httpClient.delete(`/articles/${slug}`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Token ${token}`,
      },
    });

    return NextResponse.json({ message: 'Article Delete Success', success: true, data: res });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export { GET, PUT, DELETE };
