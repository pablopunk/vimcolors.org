import React, { useState, useEffect } from 'react'
import { SketchPicker as Picker } from 'react-color'
import sick from 'sick-colors'
import styled from 'styled-components'
import { generate } from '../lib/file'
import classNames from 'classnames'
import { IoMdDownload } from 'react-icons/io'

const defaults = {
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
}
const StatusLine = styled.div`
  position: absolute;
  bottom: 10px;
  width: calc(100% - 20px);
  left: 10px;
`

const StyledSection = styled.section<{
  colors: any
}>`
  background-color: ${(props) => props.colors.bg};
  color: ${(props) => props.colors.fg};
`

const StyledPicker = styled.div<{
  right: boolean
  left: boolean
}>`
  position: absolute;
  ${(props) => (props.right ? 'right: 0;' : '')}
  ${(props) => (props.left ? 'left: 0;' : '')}
  z-index: 100;
`

export const Terminal = () => {
  const [name, setName] = useState('')
  const [darkLight, setDarkLight] = useState('dark' as 'dark' | 'light')
  const [colors, setColors] = useState({ ...defaults })
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
  const wrapperRefs: any = {}

  for (let picker in pickers) {
    wrapperRefs[picker] = React.createRef()
  }

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
    generate(name, colors, darkLight)
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
    <section>
      <div className="flex flex-col items-center">
        <input
          onChange={(ev) => handleNameChange(ev)}
          type="text"
          placeholder="Choose a name"
          value={name}
          className="border my-3 text-xl p-3 text-accent focus:outline-none bg-bg rounded-md"
        />
        <div className="mb-4 bg-bg rounded-full border shadow-md p-[2px]">
          <button
            onClick={() => setDarkLight('dark')}
            className={classNames(
              'font-sans font-semibold px-3 py-1 rounded-full transition-colors mr-1',
              {
                'bg-accent2 text-bg': darkLight === 'dark',
                'opacity-60': darkLight === 'light',
              }
            )}
          >
            Dark
          </button>
          <button
            onClick={() => setDarkLight('light')}
            className={classNames(
              'font-sans font-semibold px-3 py-1 rounded-full transition-colors',
              {
                'bg-accent2 text-bg': darkLight === 'light',
                'opacity-60': darkLight === 'dark',
              }
            )}
          >
            Light
          </button>
        </div>
        <StyledSection
          colors={colors}
          className="rounded-md shadow-lg pb-[40px] relative w-[350px]"
        >
          <div className="relative bg-[rgb(60,80,80)] w-full h-[23px] flex items-center pl-1 rounded-t-md">
            <div className="bg-[rgb(255,95,87)] rounded-full w-3 h-3 mx-1" />
            <div className="bg-[rgb(255,188,46)] rounded-full w-3 h-3 mx-1" />
            <div className="bg-[rgb(43,200,64)] rounded-full w-3 h-3 mx-1" />
          </div>
          <div className="flex justify-between w-full px-5 py-6">
            <div>
              <div className="pb-2">
                <label
                  onClick={(ev) => {
                    pickerClicked('bg')
                    ev.stopPropagation()
                  }}
                  className="underline transition-opacity hover:opacity-60 cursor-pointer"
                >
                  Background
                </label>
                {pickers.bg && (
                  <StyledPicker
                    onClick={(ev) => ev.stopPropagation()}
                    ref={wrapperRefs.bg}
                  >
                    <Picker
                      color={colors.bg}
                      onChangeComplete={(color) => changeColor('bg', color.hex)}
                    />
                  </StyledPicker>
                )}
              </div>
              <div className="pb-2">
                <label
                  onClick={(ev) => {
                    pickerClicked('fg')
                    ev.stopPropagation()
                  }}
                  className="underline transition-opacity hover:opacity-60 cursor-pointer"
                >
                  Foreground
                </label>
                {pickers.fg && (
                  <StyledPicker
                    onClick={(ev) => ev.stopPropagation()}
                    ref={wrapperRefs.fg}
                  >
                    <Picker
                      color={colors.fg}
                      onChangeComplete={(color) => changeColor('fg', color.hex)}
                    />
                  </StyledPicker>
                )}
              </div>
              <div>
                <label
                  onClick={(ev) => {
                    pickerClicked('comments')
                    ev.stopPropagation()
                  }}
                  style={{
                    color: colors.comments,
                  }}
                  className="underline transition-opacity hover:opacity-60 cursor-pointer"
                >
                  // Comments
                </label>
                {pickers.comments && (
                  <StyledPicker
                    onClick={(ev) => ev.stopPropagation()}
                    ref={wrapperRefs.comments}
                  >
                    <Picker
                      color={colors.comments}
                      onChangeComplete={(color) =>
                        changeColor('comments', color.hex)
                      }
                    />
                  </StyledPicker>
                )}
              </div>
            </div>
            <div>
              {[1, 2, 3, 4, 5, 6].map((colorN) => (
                <div key={'color' + colorN} className="pb-2">
                  <label
                    onClick={(ev) => {
                      pickerClicked('color' + colorN)
                      ev.stopPropagation()
                    }}
                    style={{ color: colors['color' + colorN] }}
                    className="underline transition-opacity hover:opacity-60 cursor-pointer"
                  >
                    Color {colorN}
                  </label>
                  {pickers['color' + colorN] && (
                    <StyledPicker
                      right
                      onClick={(ev) => ev.stopPropagation()}
                      ref={wrapperRefs['color' + colorN]}
                    >
                      <Picker
                        color={colors['color' + colorN]}
                        onChangeComplete={(color) =>
                          changeColor('color' + colorN, color.hex)
                        }
                      />
                    </StyledPicker>
                  )}
                </div>
              ))}
            </div>
            <StatusLine
              onClick={(ev) => {
                pickerClicked('menus')
                ev.stopPropagation()
              }}
              style={{
                backgroundColor: colors.menus,
              }}
            >
              <span className="ml-1 underline cursor-pointer hover:opacity-60 transition-opacity">
                statusline/color.js
              </span>
              {pickers.menus && (
                <StyledPicker
                  onClick={(ev) => ev.stopPropagation()}
                  ref={wrapperRefs.menus}
                >
                  <Picker
                    color={colors.menus}
                    onChangeComplete={(color) => {
                      changeColor('menus', color.hex)
                    }}
                  />
                </StyledPicker>
              )}
            </StatusLine>
          </div>
        </StyledSection>
        <button
          onClick={() => downloadClicked()}
          className="flex gap-2 items-center my-3 text-2xl border-accent3 text-bg bg-accent2 p-3 rounded-md shadow-md hover:bg-accent3 hover:scale-105 transition-all"
        >
          <IoMdDownload /> Download
        </button>
      </div>
    </section>
  )
}

export default Terminal
