import { httpClient } from '@/api/http/httpClient';
import { followAPI, unFollowAPI } from '@/api/profile';
import { getToken } from '@/utils/cookies';
import { NextRequest, NextResponse } from 'next/server';

async function GET(request: NextRequest, route: { params: { username: string } }) {
  const username = route.params.username;
  const token = getToken(request);

  try {
    const response = await httpClient.get(`/profiles/${username.replace('@', '')}`, {
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
async function POST(request: NextRequest, route: { params: { username: string } }) {
  const username = route.params.username;

  const token = getToken(request);

  try {
    const response = followAPI(username, token);

    return NextResponse.json({ message: 'Follow Success', response });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

// Unfollow a user
async function DELETE(request: NextRequest, route: { params: { username: string } }) {
  const username = route.params.username;
  const token = getToken(request);
  try {
    const response = unFollowAPI(username, token);

    return NextResponse.json({ message: 'Unfollow Success', response });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export { GET, POST, DELETE };
