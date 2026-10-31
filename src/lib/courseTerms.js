import { connectDB } from '@/lib/db'
import CourseSetting from '@/models/CourseSetting'
import { courseTerms, courseBatches } from '@/data/courseFees'

// YYYY-MM-DD (Nepal samaya anusar)
const ymd = (d) => new Date(d).toLocaleDateString('en-CA', { timeZone: 'Asia/Kathmandu' })
const pretty = (d) =>
  new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kathmandu' })

const cleanBatches = (batches = []) => batches.map((b) => ({ date: b.date, times: [...(b.times ?? [])] }))

async function loadDocs() {
  try {
    await connectDB()
    return await CourseSetting.find().lean()
  } catch (err) {
    console.error('Course settings could not be loaded:', err.message)
    return [] // database nabhetepani site chalchha (code ko default use huncha)
  }
}

// Admin form ko lagi
export function toAdminShape(slug, doc) {
  const def = courseTerms[slug]
  if (!doc) {
    return {
      slug,
      custom: false,
      duration: def.duration,
      original: def.fee.original,
      offer: def.fee.offer,
      offerEnds: '',
      batches: cleanBatches(courseBatches[slug]),
    }
  }
  return {
    slug,
    custom: true,
    duration: doc.duration || def.duration,
    original: doc.original,
    offer: doc.offer,
    offerEnds: doc.offerEndsAt ? ymd(doc.offerEndsAt) : '',
    batches: cleanBatches(doc.batches),
  }
}

// Public site ko lagi: offer ko miti gayo bhane regular fee matra
function toPublicShape(slug, doc, now) {
  const def = courseTerms[slug]
  if (!doc) {
    return { duration: def.duration, fee: { ...def.fee }, offerEnds: null, batches: cleanBatches(courseBatches[slug]) }
  }
  const offerActive = doc.offerEndsAt ? new Date(doc.offerEndsAt) >= now : true
  return {
    duration: doc.duration || def.duration,
    fee: { original: doc.original, offer: offerActive ? Math.min(doc.offer, doc.original) : doc.original },
    offerEnds: doc.offerEndsAt && offerActive ? pretty(doc.offerEndsAt) : null,
    batches: cleanBatches(doc.batches),
  }
}

export async function getCourseTerms() {
  const docs = await loadDocs()
  const bySlug = Object.fromEntries(docs.map((d) => [d.slug, d]))
  const now = new Date()
  return Object.fromEntries(Object.keys(courseTerms).map((slug) => [slug, toPublicShape(slug, bySlug[slug], now)]))
}

export async function getAdminCourseSettings() {
  const docs = await loadDocs()
  const bySlug = Object.fromEntries(docs.map((d) => [d.slug, d]))
  return Object.fromEntries(Object.keys(courseTerms).map((slug) => [slug, toAdminShape(slug, bySlug[slug])]))
}