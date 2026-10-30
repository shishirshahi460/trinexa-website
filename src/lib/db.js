import mongoose from 'mongoose'

// Dev ma hot-reload huda baar baar connect nagarne
let cached = globalThis._mongooseCache
if (!cached) cached = globalThis._mongooseCache = { conn: null, promise: null }

export async function connectDB() {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI is not set')

  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, { bufferCommands: false })
  }
  cached.conn = await cached.promise
  return cached.conn
}