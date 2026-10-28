// Google/share ko lagi chhoto description (155 akshar samma)
export const short = (text, max = 155) =>
  text.length > max ? `${text.slice(0, max - 3).trimEnd()}...` : text
