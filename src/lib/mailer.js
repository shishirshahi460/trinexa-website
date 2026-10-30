import nodemailer from 'nodemailer'

// Email jaana sakena bhane pani form fail hudaina (data pahile nai save bhayeko hunchha)
export async function sendNotification({ subject, text, replyTo }) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFY_EMAIL } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !NOTIFY_EMAIL) return false

  try {
    const port = Number(SMTP_PORT ?? 465)
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })
    await transporter.sendMail({
      from: `"TRINEXA Website" <${SMTP_USER}>`,
      to: NOTIFY_EMAIL,
      replyTo,
      subject: subject.replace(/[\r\n]+/g, ' '),
      text,
    })
    return true
  } catch (err) {
    console.error('Email notification failed:', err.message)
    return false
  }
}