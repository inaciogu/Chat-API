import { z } from "zod";

const MessageSchema = z.object({
  room: z.string(),
  author: z.string(),
  message: z.string(),
  time: z.string()
});

export type Message = z.infer<typeof MessageSchema>;