import DOMPurify from 'isomorphic-dompurify'

export const sanitizeHTML = (html?: string) => {
  if (!html) return ""
  return DOMPurify.sanitize(html)
}
