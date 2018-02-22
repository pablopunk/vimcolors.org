'use strict'

export function normalize (str) {
  let normalized = `${str}`

  normalized = normalized.replace(/[^a-zA-Z0-9_]/g, '-').replace(/-{2,}/g, '-').replace(/^-/, '').replace(/-$/, '')

  if (/^\d/.test(normalized)) {
    normalized = `-${normalized}`
  }

  return normalized
}
