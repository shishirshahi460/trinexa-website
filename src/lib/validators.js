import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  mobile: z.string().trim().regex(/^[0-9+\-\s]{7,20}$/),
  email: z.string().trim().email().max(200),
  topic: z.string().trim().min(1).max(100),
  message: z.string().trim().min(5).max(3000),
  website: z.string().optional(), // honeypot: manche le bharidaina
  startedAt: z.number().optional(), // form kholeko samaya
})