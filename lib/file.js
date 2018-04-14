/* global Blob */
'use strict'

import vim from 'vim-colors'
import save from 'save-file'
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

  const file = new Blob([vimScript], {type: 'text/plain'})
  save(file, `${name}.vim`, err => console.error(err))
}
