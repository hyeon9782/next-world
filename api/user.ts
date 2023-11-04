import { LoginUser, NewUser, UpdateUser } from '@/types/api/users';
import { httpClient } from './http/httpClient';

// 회원가입
const registerUserAPI = async (user: NewUser) => {
  return httpClient.post('/users', { user });
};

// 로그인
const loginAPI = async (user: LoginUser) => {
  return httpClient.post('/users/login', { user });
};

// 회원정보 수정
const updateUserAPI = async (user: UpdateUser, auth: string) => {
  return httpClient.put(
    '/user',
    { user },
    {
      headers: {
        Authorization: `Token ${auth}`,
      },
    }
  );
};

// 현재 유저 조회
const getUserAPI = async (auth: string) => {
  return httpClient.get('/user', {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Token ${auth}`,
    },
  });
};

export { registerUserAPI, loginAPI, getUserAPI, updateUserAPI };
