import { NextSeo } from 'next-seo'
import React from 'react'

const Layout = ({ children }) => (
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
            url: 'https://vimcolors.org/images/preview.png',
          },
        ],
      }}
    />
    <meta
      name="keywords"
      content="vim,colors,scheme,colorscheme,generator,generate,website,modern,minimalistic,tool,palette,background,foreground,file"
    />
    <main>{children}</main>
  </>
)

export default Layout
