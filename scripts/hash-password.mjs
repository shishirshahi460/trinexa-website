import bcrypt from 'bcryptjs'

const password = process.argv[2]
if (!password || password.length < 10) {
  console.error('Usage: node scripts/hash-password.mjs "your-password"  (kam se kam 10 akshar)')
  process.exit(1)
}

// base64 ma print garne: bcrypt hash ma $ chinha hunchha, jun .env le variable thanchha
console.log(Buffer.from(bcrypt.hashSync(password, 12)).toString('base64'))