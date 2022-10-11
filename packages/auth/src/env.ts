import { z } from "zod";

const serverSchema = z.object({
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
});

export const env = serverSchema.parse(process.env);
