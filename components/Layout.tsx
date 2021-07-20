import { NextSeo } from 'next-seo'
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
    <NextSeo
      title="Vim colors generator"
      description="Choose up to 6 colors of your choice. Then, generate a custom colorscheme for vim based only on those colors and export it to a vim-compatible file"
      openGraph={{
        type: 'website',
        url: 'https://vimcolors.org',
        site_name: 'vimcolors.org',
        description:
          'Choose up to 6 colors of your choice. Then, generate a custom colorscheme for vim based only on those colors and export it to a vim-compatible file',
        images: [
          {
            url: '/images/preview.png',
          },
        ],
      }}
    />
    <meta
      name="keywords"
      content="vim,colors,scheme,colorscheme,generator,generate,website,modern,minimalistic,tool,palette,background,foreground,file"
    />
    <StyledMain>{children}</StyledMain>
    <GlobalStyle />
  </>
)
