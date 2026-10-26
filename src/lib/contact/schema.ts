import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100).regex(/^[^\r\n]+$/),
  email: z.string().trim().max(254).pipe(z.email()),
  phone: z.string().trim().max(60).optional().default(""),
  subject: z.string().trim().max(150).regex(/^[^\r\n]*$/).optional().default(""),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(0).optional().default(""),
});
export type ContactInput = z.infer<typeof contactSchema>;
