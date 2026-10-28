import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Yo project nai root ho, bahira ko package-lock.json lai ignore garne
  turbopack: { root: __dirname },
}

export default nextConfig