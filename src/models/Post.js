import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 150 },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true, maxlength: 80 },
    excerpt: { type: String, trim: true, maxlength: 300, default: '' },
    content: { type: String, required: true, maxlength: 50000 },
    coverImage: { type: String, trim: true, maxlength: 200, default: '' },
    status: { type: String, enum: ['draft', 'published'], default: 'draft', index: true },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true },
)

export default mongoose.models.Post || mongoose.model('Post', PostSchema)