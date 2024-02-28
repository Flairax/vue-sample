import { z } from 'zod';

export const JWT_TOKENS_SCHEMA = z.object({
  access: z.string(),
  refresh: z.string(),
});

export type TJwtTokens = z.infer<typeof JWT_TOKENS_SCHEMA>;
