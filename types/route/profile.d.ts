import { Profile } from '../api/profile';

export type ProfileResponse = {
  message: string;
  response: {
    profile: Profile;
  };
};
