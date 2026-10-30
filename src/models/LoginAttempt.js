import mongoose from 'mongoose'

// Galat login ko record. 15 minute (900 second) pachhi aafai hatchha.
const LoginAttemptSchema = new mongoose.Schema({
  ipHash: { type: String, index: true },
  createdAt: { type: Date, default: Date.now, expires: 900 },
})

export default mongoose.models.LoginAttempt || mongoose.model('LoginAttempt', LoginAttemptSchema)