import { createRequestMock } from '@/utils'
import { MOCK_CREDENTIALS } from '../auth/auth.mock'
import { type TUserProfile } from './profile.model'

const MOCK_PROFILE: TUserProfile = {
  id: `1`,
  name: `Mock`,
  avatar: ``,
  createdAt: new Date().toUTCString(),
  email: MOCK_CREDENTIALS.email,
  email_verified: true
}

export const PROFILE = createRequestMock<null, TUserProfile>(({ body }) => {
  return MOCK_PROFILE
})
