import React from 'react'
import {SketchPicker as Picker} from 'react-color'
import {generate} from '../lib/file'

const defaults = {
  bg: '#1E1F28',
  fg: '#F7FFF7',
  color1: '#FF6B6B',
  color2: '#2CF6B3',
  color3: '#FFE66D',
  color4: '#809BCE',
  color5: '#FF6699',
  color6: '#4ECDC4'
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
    generate(this.state.name, this.state.colors)
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
            {
            [1,2,3,4,5,6].map((colorN) => (
              <article key={'article'+colorN}>
                <label onClick={ev => {
                  this.pickerClicked('color'+colorN)
                  ev.stopPropagation()
                }} style={{ color: colors['color'+colorN] }}>Color {colorN}</label>
                { pickers['color'+colorN] &&
                <div className='picker' onClick={ev => ev.stopPropagation()} ref={(node) => this.setWrapperRef(node)}>
                  <Picker color={colors['color'+colorN]} onChangeComplete={color => this.changeColor('color'+colorN, color.hex)} />
                </div>
      }
              </article>
            ))
            }
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
