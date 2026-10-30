import mongoose from 'mongoose'

const EnquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    mobile: { type: String, required: true, trim: true, maxlength: 20 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
    topic: { type: String, required: true, trim: true, maxlength: 100 },
    message: { type: String, required: true, trim: true, maxlength: 3000 },
    status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
    ipHash: { type: String, index: true }, // asli IP save gardainau, hash matra
  },
  { timestamps: true },
)

export default mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema)