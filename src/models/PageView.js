import mongoose from 'mongoose'

// Ek page-view = ek line. 400 din pachhi aafai hatchha. IP save hudaina.
const PageViewSchema = new mongoose.Schema({
  path: { type: String, required: true, maxlength: 200 },
  visitorHash: { type: String, required: true }, // din-din badline hash
  country: { type: String, default: 'Unknown', maxlength: 10 },
  city: { type: String, default: '', maxlength: 80 },
  device: { type: String, enum: ['desktop', 'mobile', 'tablet'], default: 'desktop' },
  browser: { type: String, default: 'Other' },
  os: { type: String, default: 'Other' },
  referrer: { type: String, default: '', maxlength: 100 },
  createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 * 400 },
})

export default mongoose.models.PageView || mongoose.model('PageView', PageViewSchema)