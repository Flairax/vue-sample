import { TRequestMock, mockError, mockResponse } from 'src/utils';
import { TUserProfile } from '../model/profile.model';
import { MOCK_CREDENTIALS } from '../../auth/mock/auth.mock';



const MOCK_PROFILE: TUserProfile = {
  id: `1`,
  name: `Mock`,
  avatar: ``,
  createdAt: new Date().toUTCString(),
  email: MOCK_CREDENTIALS.email,
  email_verified: true,
};


export const PROFILE: TRequestMock<void, TUserProfile> = () => {
  return mockResponse(MOCK_PROFILE, 1);
};
