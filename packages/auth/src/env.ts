import { z } from "zod";

const serverSchema = z.object({
  DISCORD_CLIENT_ID: z.string(),
  DISCORD_CLIENT_SECRET: z.string(),
});

export const env = serverSchema.parse(process.env);
