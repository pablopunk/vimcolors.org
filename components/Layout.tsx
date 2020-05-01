import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

const StyledMain = styled.main`
  max-width: 700px;
  margin: 0 auto;
  padding: 1em;
  font-family: 'SF Mono', Menlo, monospace;
`

const GlobalStyle = createGlobalStyle`
  body {
    position: relative;
    margin: 0;
    padding: 0;
    background-color: white;
    color: #333;
  }

  body.dark {
    background-color: black;
    color: #efefef;
  }
`

export default ({ children }) => (
  <>
    <GlobalStyle />
    <StyledMain>{children}</StyledMain>
  </>
)
