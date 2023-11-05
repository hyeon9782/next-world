import { createCommentAPI, deleteCommentAPI, getCommentsAPI } from '@/api/comments';
import { getToken } from '@/utils/cookies';
import { NextRequest, NextResponse } from 'next/server';

async function GET(request: NextRequest, route: { params: { slug: string } }) {
  try {
    const slug = route.params.slug;
    const token = getToken(request);

    const res = await getCommentsAPI(slug, token);

    console.log(res);

    return NextResponse.json({ message: 'Comment Get Success', success: true, data: res });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

async function POST(request: NextRequest, route: { params: { slug: string } }) {
  try {
    const body = await request.json();
    const slug = route.params.slug;
    const token = getToken(request);

    console.log(body);
    // console.log(body.comment);

    const res = await createCommentAPI(slug, token, body);

    console.log(res);

    return NextResponse.json({ message: 'Comment Create Success', success: true, data: res });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

async function DELETE(request: NextRequest, route: { params: { slug: string } }) {
  try {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get('id') || '';
    const slug = route.params.slug;

    const token = getToken(request);

    const res = deleteCommentAPI(slug, id, token);

    return NextResponse.json({ message: 'Comment Delete Success', success: true, data: res });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export { GET, POST, DELETE };
