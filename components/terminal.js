/* global URL, Blob */
import React from 'react'
import {SketchPicker as Picker} from 'react-color'
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
  color1: '#eb597b',
  color2: '#fcb900',
  color3: '#12cbc5',
  color4: '#9980fa'
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
      newColors.color4
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
        color4: false
      }
    }
  }

  componentDidMount () {
    document.addEventListener('mousedown', ev => this.handleClickOutside(ev))
  }

  componentWillUnmount () {
    document.removeEventListener('mousedown', ev => this.handleClickOutside(ev))
  }

  setWrapperRef (node) {
    this.wrapperRef = node
  }

  handleClickOutside (ev) {
    if (this.wrapperRef && !this.wrapperRef.contains(ev.target)) {
      this.closePickers()
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

  closePickers () {
    this.setState({
      pickers: {
        bg: false,
        fg: false,
        color1: false,
        color2: false,
        color3: false,
        color4: false
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
      <div className='terminal-wrapper'>
        <input onChange={ev => this.handleNameChange(ev)} type='text' placeholder='Choose a name' value={this.state.name} />
        <section>
          <div>
            <article>
              <label onClick={ev => {
                this.pickerClicked('bg')
                ev.stopPropagation()
              }}>Background</label>
              { pickers.bg &&
              <div className='picker' onClick={ev => ev.stopPropagation()} ref={(node) => this.setWrapperRef(node)}>
                <Picker color={colors.bg} onChangeComplete={color => this.changeColor('bg', color.hex)} />
              </div>
          }
            </article>
            <article>
              <label onClick={ev => {
                this.pickerClicked('fg')
                ev.stopPropagation()
              }}>Foreground</label>
              { pickers.fg &&
              <div className='picker' onClick={ev => ev.stopPropagation()} ref={(node) => this.setWrapperRef(node)}>
                <Picker color={colors.bg} onChangeComplete={color => this.changeColor('fg', color.hex)} />
              </div>
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
              <div className='picker' onClick={ev => ev.stopPropagation()} ref={(node) => this.setWrapperRef(node)}>
                <Picker color={colors.color1} onChangeComplete={color => this.changeColor('color1', color.hex)} />
              </div>
      }
            </article>
            <article>
              <label onClick={ev => {
                this.pickerClicked('color2')
                ev.stopPropagation()
              }} style={{ color: colors.color2 }}>Color 2</label>
              { pickers.color2 &&
              <div className='picker' onClick={ev => ev.stopPropagation()} ref={(node) => this.setWrapperRef(node)}>
                <Picker color={colors.color2} onChangeComplete={color => this.changeColor('color2', color.hex)} />
              </div>
    }
            </article>
            <article>
              <label onClick={ev => {
                this.pickerClicked('color3')
                ev.stopPropagation()
              }} style={{ color: colors.color3 }}>Color 3</label>
              { pickers.color3 &&
              <div className='picker' onClick={ev => ev.stopPropagation()} ref={(node) => this.setWrapperRef(node)}>
                <Picker color={colors.color3} onChangeComplete={color => this.changeColor('color3', color.hex)} />
              </div>
  }
            </article>
            <article>
              <label onClick={ev => {
                this.pickerClicked('color4')
                ev.stopPropagation()
              }} style={{ color: colors.color4 }}>Color 4</label>
              { pickers.color4 &&
              <div className='picker' onClick={ev => ev.stopPropagation()} ref={(node) => this.setWrapperRef(node)}>
                <Picker color={colors.color4} onChangeComplete={color => this.changeColor('color4', color.hex)} />
              </div>
}
            </article>
          </div>
        </section>
        <button onClick={() => this.downloadClicked()}>Download</button>
      </div>
      <style jsx>{`
        .terminal-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
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
          justify-content: space-between;
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
        .picker {
          position: absolute;
        }
        button {
          margin-top: 1em;
          font-size: 1.2em;
          font-family: 'SF Mono', Menlo, monospace;
          background-color: royalblue;
          color: white;
          padding: .5em 2em;
          border: none;
          border-radius: 3px;
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
