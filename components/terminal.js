import React from 'react'
import { SketchPicker as Picker } from 'react-color'
import sick from 'sick-colors'
import { generate } from '../lib/file'

const defaults = {
  dark: {
    bg: sick.background,
    fg: sick.foreground,
    comments: sick.magenta,
    menus: sick.black,
    color1: sick.red,
    color2: sick.green,
    color3: sick.yellow,
    color4: sick.blue,
    color5: sick.magenta,
    color6: sick.cyan
  },
  light: {
    bg: sick.light.background,
    fg: sick.light.foreground,
    comments: sick.light.magenta,
    menus: sick.light.white,
    color1: sick.light.red,
    color2: sick.light.green,
    color3: sick.light.yellow,
    color4: sick.light.blue,
    color5: sick.light.magenta,
    color6: sick.light.cyan
  }
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
        comments: false,
        menus: false,
        color1: false,
        color2: false,
        color3: false,
        color4: false,
        color5: false,
        color6: false
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
        menus: false,
        comments: false,
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
    const { colors } = this.state
    colors[which] = color

    this.setState({ colors })
  }

  downloadClicked () {
    generate(this.state.name, this.state.colors)
  }

  handleNameChange (ev) {
    this.setState({ name: ev.target.value })
  }

  render () {
    const { theme } = this.props
    let { colors, pickers } = this.state

    colors = colors[theme]

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
                <Picker color={colors.fg} onChangeComplete={color => this.changeColor('fg', color.hex)} />
              </div>
              }
            </article>
            <article>
              <label onClick={ev => {
                this.pickerClicked('menus')
                ev.stopPropagation()
              }} style={{
                backgroundColor: colors.menus
              }}>Menus</label>
              { pickers.menus &&
              <div className='picker' onClick={ev => ev.stopPropagation()} ref={(node) => this.setWrapperRef(node)}>
                <Picker color={colors.menus} onChangeComplete={color => this.changeColor('menus', color.hex)} />
              </div>
              }
            </article>
            <article>
              <label onClick={ev => {
                this.pickerClicked('comments')
                ev.stopPropagation()
              }} style={{
                color: colors.comments
              }}>// Comments</label>
              { pickers.comments &&
              <div className='picker' onClick={ev => ev.stopPropagation()} ref={(node) => this.setWrapperRef(node)}>
                <Picker color={colors.comments} onChangeComplete={color => this.changeColor('comments', color.hex)} />
              </div>
              }
            </article>
          </div>
          <div>
            {
              [1, 2, 3, 4, 5, 6].map((colorN) => (
                <article key={'article' + colorN}>
                  <label onClick={ev => {
                    this.pickerClicked('color' + colorN)
                    ev.stopPropagation()
                  }} style={{ color: colors['color' + colorN] }}>Color {colorN}</label>
                  { pickers['color' + colorN] &&
                <div className='picker' onClick={ev => ev.stopPropagation()} ref={(node) => this.setWrapperRef(node)}>
                  <Picker color={colors['color' + colorN]} onChangeComplete={color => this.changeColor('color' + colorN, color.hex)} />
                </div>
                  }
                </article>
              ))
            }
          </div>
        </section>
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
      `}</style>
    </div>
  }
}
