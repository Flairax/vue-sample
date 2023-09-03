import { z } from 'zod';

export const USER_PROFILE_SCHEMA = z.object({
    id: z.string(),
    name: z.string(),
    avatar: z.string(),
    createdAt: z.string(),
    email: z.string(),
    email_verified: z.boolean(),
});

export type TUserProfile = z.infer<typeof USER_PROFILE_SCHEMA>;
