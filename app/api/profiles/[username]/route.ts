import { http } from '@/utils/http';
import { NextRequest, NextResponse } from 'next/server';

async function GET(req: NextRequest, route: { params: { username: string } }) {
  const username = route.params.username;
  const token = req.cookies.get('token')?.value || '';

  try {
    const response = await http.get(`/profiles/${username.replace('@', '')}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    return NextResponse.json({ message: 'Get a Profile Success', response });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

// Follow a user
async function POST(req: NextRequest, route: { params: { username: string } }) {
  const username = route.params.username;

  const token = req.cookies.get('token')?.value || '';

  try {
    const response = await http.post(`/profiles/${username}/follow`, '', {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    return NextResponse.json({ message: 'Follow Success', response });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

// Unfollow a user
async function DELETE(req: NextRequest, route: { params: { username: string } }) {
  const username = route.params.username;
  const token = req.cookies.get('token')?.value || '';
  try {
    const response = await http.delete(`/profiles/${username}/follow`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    return NextResponse.json({ message: 'Unfollow Success', response });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export { GET, POST, DELETE };
