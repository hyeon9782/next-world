import { User } from '../api/users';

export type UserAction = {
  saveUserInfo: (user: User) => void;
  updateUserStore: (user: User) => void;
  logout: () => void;
};
