// Browser ko User-Agent bata device, browser ra OS chinne (bot lai chhutyaune)
export function parseUA(ua = '') {
  const u = ua.toLowerCase()
  const isBot =
    !u ||
    /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|whatsapp|telegram|preview|headless|lighthouse|pagespeed|vercel|curl|wget|python-requests|node-fetch|axios|monitor/.test(u)

  const device = /ipad|tablet|(android(?!.*mobile))/.test(u)
    ? 'tablet'
    : /mobi|iphone|ipod|android/.test(u)
      ? 'mobile'
      : 'desktop'

  const browser = /edg\//.test(u)
    ? 'Edge'
    : /opr\/|opera/.test(u)
      ? 'Opera'
      : /samsungbrowser/.test(u)
        ? 'Samsung Internet'
        : /chrome|crios/.test(u)
          ? 'Chrome'
          : /firefox|fxios/.test(u)
            ? 'Firefox'
            : /safari/.test(u)
              ? 'Safari'
              : 'Other'

  const os = /windows/.test(u)
    ? 'Windows'
    : /android/.test(u)
      ? 'Android'
      : /iphone|ipad|ipod|ios/.test(u)
        ? 'iOS'
        : /mac os|macintosh/.test(u)
          ? 'macOS'
          : /linux|cros/.test(u)
            ? 'Linux'
            : 'Other'

  return { isBot, device, browser, os }
}