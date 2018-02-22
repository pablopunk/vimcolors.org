/* global URL, Blob */
'use strict'

import vim from 'vim-colors'
import {removeHash} from './colors'
import {normalize} from './string'

export function generate (name, colors) {
  const newColors = removeHash(colors)

  name = normalize(name)
  if (!name) {
    name = 'my-scheme'
  }

  const vimScript = vim(name, {
    fg: newColors.fg,
    bg: newColors.bg,
    scheme: [
      newColors.color1,
      newColors.color2,
      newColors.color3,
      newColors.color4
    ]
  })

  const el = document.createElement('a')
  const file = new Blob([vimScript], {type: 'text/plain'})
  el.href = URL.createObjectURL(file)
  el.download = `${name}.vim`
  el.click()
}
