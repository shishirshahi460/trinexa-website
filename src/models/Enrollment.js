import mongoose from 'mongoose'

const EnrollmentSchema = new mongoose.Schema(
  {
    reference: { type: String, required: true, unique: true }, // jastai TRX-8K3P2M
    courseSlug: { type: String, required: true },
    courseTitle: { type: String, required: true },
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
    mobile: { type: String, required: true, trim: true, maxlength: 25 },
    address: { type: String, required: true, trim: true, maxlength: 200 },
    college: { type: String, trim: true, maxlength: 150, default: '' },
    otherCourse: { type: String, trim: true, maxlength: 150, default: '' },
    paymentMethod: { type: String, required: true },
    amount: { type: Number, required: true },
    expectedFee: { type: Number }, // sabai bhanda aghi ko offer fee (admin le tulana garna)
    transactionRef: { type: String, trim: true, maxlength: 100, default: '' },
    remarks: { type: String, trim: true, maxlength: 1000, default: '' },
    agreedToTerms: { type: Boolean, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
    ipHash: { type: String, index: true },
  },
  { timestamps: true },
)

export default mongoose.models.Enrollment || mongoose.model('Enrollment', EnrollmentSchema)