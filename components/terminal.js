import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
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
    color6: sick.cyan,
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
    color6: sick.light.cyan,
  },
}

export default (props) => {
  const [name, setName] = useState('')
  const [colors, setColors] = useState({ ...defaults[props.theme] })
  const [pickers, setPickers] = useState({
    bg: false,
    fg: false,
    comments: false,
    menus: false,
    color1: false,
    color2: false,
    color3: false,
    color4: false,
    color5: false,
    color6: false,
  })
  const wrapperRefs = {}

  for (let picker in pickers) {
    wrapperRefs[picker] = React.createRef()
  }

  useEffect(() => {
    setColors({ ...defaults[props.theme] })
  }, [props.theme])

  useEffect(() => {
    document.addEventListener('mousedown', (ev) => handleClickOutside(ev))
    return () =>
      document.removeEventListener('mousedown', (ev) => handleClickOutside(ev))
  })

  function handleClickOutside(ev) {
    const anyColorOpen = Object.entries(pickers)
      .map(([color, isOpen]) => ({ color, isOpen }))
      .filter(({ isOpen }) => isOpen)

    if (anyColorOpen.length > 0) {
      const ref = wrapperRefs[anyColorOpen[0].color]

      if (ref && ref.current && !ref.current.contains(ev.target)) {
        closePickers()
      }
    }
  }

  function downloadClicked() {
    generate(name, colors)
  }

  function pickerClicked(which) {
    if (pickers.hasOwnProperty(which)) {
      const newPickers = { ...pickers }
      const value = !pickers[which]

      // Close all
      for (const i in pickers) {
        newPickers[i] = false
      }

      newPickers[which] = value

      setPickers(newPickers)
    }
  }

  function closePickers() {
    setPickers({
      bg: false,
      fg: false,
      menus: false,
      comments: false,
      color1: false,
      color2: false,
      color3: false,
      color4: false,
      color5: false,
      color6: false,
    })
  }

  function changeColor(which, color) {
    setColors({
      ...colors,
      [which]: color,
    })
  }

  function handleNameChange(ev) {
    setName(ev.target.value)
  }

  return (
    <div>
      <div className="terminal-wrapper">
        <input
          onChange={(ev) => handleNameChange(ev)}
          type="text"
          placeholder="Choose a name"
          value={name}
        />
        <section>
          <div>
            <article>
              <label
                onClick={(ev) => {
                  pickerClicked('bg')
                  ev.stopPropagation()
                }}
              >
                Background
              </label>
              {pickers.bg && (
                <div
                  className="picker"
                  onClick={(ev) => ev.stopPropagation()}
                  ref={wrapperRefs.bg}
                >
                  <Picker
                    color={colors.bg}
                    onChangeComplete={(color) => changeColor('bg', color.hex)}
                  />
                </div>
              )}
            </article>
            <article>
              <label
                onClick={(ev) => {
                  pickerClicked('fg')
                  ev.stopPropagation()
                }}
              >
                Foreground
              </label>
              {pickers.fg && (
                <div
                  className="picker"
                  onClick={(ev) => ev.stopPropagation()}
                  ref={wrapperRefs.fg}
                >
                  <Picker
                    color={colors.fg}
                    onChangeComplete={(color) => changeColor('fg', color.hex)}
                  />
                </div>
              )}
            </article>
            <article>
              <label
                onClick={(ev) => {
                  pickerClicked('comments')
                  ev.stopPropagation()
                }}
                style={{
                  color: colors.comments,
                }}
              >
                // Comments
              </label>
              {pickers.comments && (
                <div
                  className="picker"
                  onClick={(ev) => ev.stopPropagation()}
                  ref={wrapperRefs.comments}
                >
                  <Picker
                    color={colors.comments}
                    onChangeComplete={(color) =>
                      changeColor('comments', color.hex)
                    }
                  />
                </div>
              )}
            </article>
          </div>
          <div>
            {[1, 2, 3, 4, 5, 6].map((colorN) => (
              <article key={'color' + colorN}>
                <label
                  onClick={(ev) => {
                    pickerClicked('color' + colorN)
                    ev.stopPropagation()
                  }}
                  style={{ color: colors['color' + colorN] }}
                >
                  Color {colorN}
                </label>
                {pickers['color' + colorN] && (
                  <div
                    className="picker"
                    onClick={(ev) => ev.stopPropagation()}
                    ref={wrapperRefs['color' + colorN]}
                  >
                    <Picker
                      color={colors['color' + colorN]}
                      onChangeComplete={(color) =>
                        changeColor('color' + colorN, color.hex)
                      }
                    />
                  </div>
                )}
              </article>
            ))}
          </div>
          <div
            className="statusline"
            onClick={(ev) => {
              pickerClicked('menus')
              ev.stopPropagation()
            }}
            style={{
              backgroundColor: colors.menus,
            }}
          >
            <span>/accent-color</span>
            {pickers.menus && (
              <div
                className="picker"
                onClick={(ev) => ev.stopPropagation()}
                ref={wrapperRefs.menus}
              >
                <Picker
                  color={colors.menus}
                  onChangeComplete={(color) => {
                    changeColor('menus', color.hex)
                  }}
                />
              </div>
            )}
          </div>
        </section>
        <button onClick={() => downloadClicked()}>Download</button>
      </div>
      <style jsx>{`
        .statusline {
          position: absolute;
          bottom: 10px;
          width: calc(100% - 20px);
        }
        .terminal-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        input {
          font-size: 1.3em;
          margin-bottom: 1em;
          width: 100%;
          padding: 0.2em 0.5em;
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
          width: 320px;
          padding: 10px 10px 30px 10px;
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
          padding: 0.2em 0.5em;
          text-decoration: underline;
        }
        .picker {
          position: absolute;
          z-index: 100;
        }
        button {
          margin-top: 1em;
          font-size: 1.2em;
          font-family: 'SF Mono', Menlo, monospace;
          background-color: royalblue;
          color: white;
          padding: 0.5em 2em;
          border: 1px solid royalblue;
          border-radius: 3px;
        }
        button:hover {
          background-color: white;
          color: royalblue;
          cursor: pointer;
          text-decoration: underline;
        }
      `}</style>
    </div>
  )
}
