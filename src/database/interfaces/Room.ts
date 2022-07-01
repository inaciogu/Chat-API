import { z } from 'zod';

export const RoomSchema = z.object({
  name: z.string().min(4),
});

export type Room = z.infer<typeof RoomSchema>;
