import { z } from "zod";

const clientSchema = z.object({
  PORT: z.string().optional(),
  VERCEL_URL: z.string().optional(),
});

export const env = clientSchema.parse(process.env);
