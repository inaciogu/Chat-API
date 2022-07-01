import { z } from 'zod';

export const MessageSchema = z.object({
  room: z.string(),
  author: z.string(),
  message: z.string(),
  date: z.string(),
  time: z.string(),
});

export type Message = z.infer<typeof MessageSchema>;
