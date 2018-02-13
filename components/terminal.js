/* global URL, Blob */
import React from 'react'
import {TwitterPicker as Picker} from 'react-color'
import vim from 'vim-colors'

const normalize = str => {
  let normalized = `${str}`

  normalized = normalized.replace(/[^a-zA-Z0-9_]/g, '-').replace(/-{2,}/g, '-').replace(/^-/, '').replace(/-$/, '')

  if (/^\d/.test(normalized)) {
    normalized = `-${normalized}`
  }

  return normalized
}

const defaults = {
  bg: '#252a38',
  fg: '#ffffff',
  color1: '#E57263',
  color2: '#42BDBD',
  color3: '#D66D93',
  color4: '#7D4B82',
  color5: '#EACB5F',
  color6: '#00A06E'
}

const removeHash = colors => {
  const newColors = {}

  for (const c in colors) {
    newColors[c] = colors[c].split('#').pop()
  }

  return newColors
}

const generateFile = (name, colors) => {
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
      newColors.color4,
      newColors.color5,
      newColors.color6
    ]
  })

  const el = document.createElement('a')
  const file = new Blob([vimScript], {type: 'text/plain'})
  el.href = URL.createObjectURL(file)
  el.download = `${name}.vim`
  el.click()
}

export default class extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      name: 'my-custom-scheme',
      colors: { ...defaults },
      pickers: {
        bg: false,
        fg: false,
        color1: false,
        color2: false,
        color3: false,
        color4: false,
        color5: false,
        color6: false
      }
    }
  }

  pickerClicked (which) {
    if (this.state.pickers.hasOwnProperty(which)) {
      const pickers = { ...this.state.pickers }
      const value = !pickers[which]

      // Close all
      for (const i in pickers) {
        pickers[i] = false
      }

      pickers[which] = value

      this.setState({ pickers })
    }
  }

  terminalClicked () {
    this.setState({
      pickers: {
        bg: false,
        fg: false,
        color1: false,
        color2: false,
        color3: false,
        color4: false,
        color5: false,
        color6: false
      }
    })
  }

  changeColor (which, color) {
    const {colors} = this.state
    colors[which] = color

    this.setState({ colors })
  }

  downloadClicked () {
    generateFile(this.state.name, this.state.colors)
  }

  handleNameChange (ev) {
    this.setState({ name: ev.target.value })
  }

  render () {
    const {colors, pickers} = this.state

    return <div>
      <input onChange={ev => this.handleNameChange(ev)} type='text' placeholder='Choose a name' value={this.state.name} />
      <section onClick={() => this.terminalClicked()}>
        <div>
          <article>
            <label onClick={ev => {
              this.pickerClicked('bg')
              ev.stopPropagation()
            }}>Background</label>
            { pickers.bg &&
            <Picker color={colors.bg} onChangeComplete={color => this.changeColor('bg', color.hex)} />
          }
          </article>
          <article>
            <label onClick={ev => {
              this.pickerClicked('fg')
              ev.stopPropagation()
            }}>Foreground</label>
            { pickers.fg &&
            <Picker color={colors.bg} onChangeComplete={color => this.changeColor('fg', color.hex)} />
        }
          </article>
        </div>
        <div>
          <article>
            <label onClick={ev => {
              this.pickerClicked('color1')
              ev.stopPropagation()
            }} style={{ color: colors.color1 }}>Color 1</label>
            { pickers.color1 &&
            <Picker color={colors.color1} onChangeComplete={color => this.changeColor('color1', color.hex)} />
      }
          </article>
          <article>
            <label onClick={ev => {
              this.pickerClicked('color2')
              ev.stopPropagation()
            }} style={{ color: colors.color2 }}>Color 2</label>
            { pickers.color2 &&
            <Picker color={colors.color2} onChangeComplete={color => this.changeColor('color2', color.hex)} />
    }
          </article>
          <article>
            <label onClick={ev => {
              this.pickerClicked('color3')
              ev.stopPropagation()
            }} style={{ color: colors.color3 }}>Color 3</label>
            { pickers.color3 &&
            <Picker color={colors.color3} onChangeComplete={color => this.changeColor('color3', color.hex)} />
  }
          </article>
          <article>
            <label onClick={ev => {
              this.pickerClicked('color4')
              ev.stopPropagation()
            }} style={{ color: colors.color4 }}>Color 4</label>
            { pickers.color4 &&
            <Picker color={colors.color4} onChangeComplete={color => this.changeColor('color4', color.hex)} />
}
          </article>
          <article>
            <label onClick={ev => {
              this.pickerClicked('color5')
              ev.stopPropagation()
            }} style={{ color: colors.color5 }}>Color 5</label>
            { pickers.color5 &&
            <Picker color={colors.color5} onChangeComplete={color => this.changeColor('color5', color.hex)} />
        }
          </article>
          <article>
            <label onClick={ev => {
              this.pickerClicked('color6')
              ev.stopPropagation()
            }} style={{ color: colors.color6 }}>Color 6</label>
            { pickers.color6 &&
            <Picker color={colors.color6} onChangeComplete={color => this.changeColor('color6', color.hex)} />
      }
          </article>
        </div>
      </section>
      <button onClick={() => this.downloadClicked()}>Download</button>
      <style jsx>{`
        input {
          font-size: 1.3em;
          margin-bottom: 1em;
          width: 100%;
          padding: .2em .5em;
          color: royalblue;
          font-family: 'SF Mono', Menlo, monospace;
          border: none;
          border-bottom: 1px solid royalblue;
        }
        input:focus {
          outline: none;
        }
        section {
          background-color: ${colors.bg};
          color: ${colors.fg};
          position: relative;
          max-width: 500px;
          width: 100%;
          padding: 1em;
          border: 1px solid black;
          border-radius: 5px;
          display: flex;
        }
        .pull-right {
          float: right;
        }
        article {
          margin: 1em 0;
        }
        article > label {
          margin: 1em;
          padding: .2em .5em;
          text-decoration: underline;
        }
        button {
          margin-top: 1em;
          font-size: 1.2em;
          font-family: 'SF Mono', Menlo, monospace;
          background-color: royalblue;
          color: white;
          padding: .5em 2em;
          border: none;
        }
        button:hover {
          background-color: white;
          color: royalblue;
          border: 1px solid royalblue;
          cursor: pointer;
          text-decoration: underline;
        }
      `}</style>
    </div>
  }
}
