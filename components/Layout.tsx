import { NextSeo } from 'next-seo'
import React from 'react'
import { BiMoon, BiSun } from 'react-icons/bi'

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
    <header className="p-4">
      <button
        onClick={() => {
          window['__toggleDarkMode']?.()
        }}
        className="border p-2 flex items-center justify-center rounded-full hover:bg-accent2 hover:text-bg transition-colors"
      >
        <div className="dark:hidden">
          <BiMoon />
        </div>
        <div className="hidden dark:flex">
          <BiSun />
        </div>
      </button>
    </header>
    <main>{children}</main>
  </>
)

export default Layout
