import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { connectDB } from '@/lib/db'
import { getAdmin } from '@/lib/auth'
import CourseSetting from '@/models/CourseSetting'
import { courseTerms } from '@/data/courseFees'
import { toAdminShape } from '@/lib/courseTerms'

export const runtime = 'nodejs'

const knownSlug = z.string().refine((s) => Object.hasOwn(courseTerms, s))

const putSchema = z
  .object({
    slug: knownSlug,
    duration: z.string().trim().max(40),
    original: z.number().int().min(0).max(1000000),
    offer: z.number().int().min(0).max(1000000),
    offerEnds: z.union([z.string().regex(/^\d{4}-\d{2}-\d{2}$/), z.literal('')]),
    batches: z
      .array(
        z.object({
          date: z.string().trim().min(1).max(40),
          times: z.array(z.string().trim().min(1).max(40)).max(10),
        }),
      )
      .max(30),
  })
  .refine((d) => d.offer <= d.original, { message: 'The offer fee cannot be higher than the regular fee.' })

const deleteSchema = z.object({ slug: knownSlug })

// Public page haru ko cache turuntai naya banaune
function refreshSite() {
  revalidatePath('/academy', 'layout')
  revalidatePath('/enroll')
}

async function readJson(request) {
  try {
    return await request.json()
  } catch {
    return null
  }
}

export async function PUT(request) {
  if (!(await getAdmin())) return NextResponse.json({ error: 'Not authorised.' }, { status: 401 })

  const parsed = putSchema.safeParse(await readJson(request))
  if (!parsed.success) {
    const custom = parsed.error.issues.find((i) => i.code === 'custom' && i.message)
    return NextResponse.json({ error: custom?.message ?? 'Please check the values and try again.' }, { status: 400 })
  }
  const d = parsed.data

  try {
    await connectDB()
    const doc = await CourseSetting.findOneAndUpdate(
      { slug: d.slug },
      {
        slug: d.slug,
        duration: d.duration,
        original: d.original,
        offer: d.offer,
        // Miti ko din ko ant (Nepal samaya) samma offer chalchha
        offerEndsAt: d.offerEnds ? new Date(`${d.offerEnds}T23:59:59+05:45`) : null,
        batches: d.batches,
      },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true, runValidators: true },
    ).lean()

    refreshSite()
    return NextResponse.json({ ok: true, settings: toAdminShape(d.slug, doc) })
  } catch (err) {
    console.error('Course save error:', err.message)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}

export async function DELETE(request) {
  if (!(await getAdmin())) return NextResponse.json({ error: 'Not authorised.' }, { status: 401 })

  const parsed = deleteSchema.safeParse(await readJson(request))
  if (!parsed.success) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })

  try {
    await connectDB()
    await CourseSetting.deleteOne({ slug: parsed.data.slug })
    refreshSite()
    return NextResponse.json({ ok: true, settings: toAdminShape(parsed.data.slug, null) })
  } catch (err) {
    console.error('Course reset error:', err.message)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}