import { z } from 'zod';

export const UserSchema = z.object({
  name: z.string().min(3),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(5),
});

export type User = z.infer<typeof UserSchema>;
