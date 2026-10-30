import { z } from 'zod'
import { minAmount } from '@/data/payment'

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  mobile: z.string().trim().regex(/^[0-9+\-\s]{7,20}$/),
  email: z.string().trim().email().max(200),
  topic: z.string().trim().min(1).max(100),
  message: z.string().trim().min(5).max(3000),
  website: z.string().optional(), // honeypot: manche le bharidaina
  startedAt: z.number().optional(), // form kholeko samaya
})

export const enrollSchema = z.object({
  course: z.string().trim().min(1).max(100),
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  mobile: z.string().trim().regex(/^\d{7,15}$/),
  address: z.string().trim().min(2).max(200),
  college: z.string().trim().max(150).default(''),
  otherCourse: z.string().trim().max(150).default(''),
  method: z.string().trim().min(1).max(50),
  amount: z.number().min(minAmount).max(1000000),
  ref: z.string().trim().max(100).default(''),
  remarks: z.string().trim().max(1000).default(''),
  agree: z.literal(true),
  website: z.string().optional(), // honeypot
  startedAt: z.number().optional(),
})