'use strict'

type Colors = { [name: string]: string }

export function removeHash(colors: Colors) {
  const newColors: Colors = {}

  for (const c in colors) {
    newColors[c] = colors[c].split('#').pop()
  }

  return newColors
}
