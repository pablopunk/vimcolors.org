'use strict'

export function removeHash(colors) {
  const newColors = {}

  for (const c in colors) {
    newColors[c] = colors[c].split('#').pop()
  }

  return newColors
}
