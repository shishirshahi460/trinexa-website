import mongoose from 'mongoose'

const CourseSettingSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    duration: { type: String, trim: true, maxlength: 40, default: '' },
    original: { type: Number, required: true, min: 0 },
    offer: { type: Number, required: true, min: 0 },
    offerEndsAt: { type: Date, default: null },
    batches: [
      {
        _id: false,
        date: { type: String, trim: true, maxlength: 40 },
        times: [{ type: String, trim: true, maxlength: 40 }],
      },
    ],
  },
  { timestamps: true },
)

export default mongoose.models.CourseSetting || mongoose.model('CourseSetting', CourseSettingSchema)