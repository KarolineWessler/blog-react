import { z } from "zod";

export const SessionDataSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  image: z.string(),
  token: z.string(),
});

export type SessionData = z.infer<typeof SessionDataSchema>;
