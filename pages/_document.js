import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    return (
      <html lang='en'>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta name='description' content='Choose up to 6 colors of your choisec. Then, generate a custom colorscheme for vim based only on those colors and export it to a vim-compatible file' />
          <meta name='keywords' content='vim,colors,scheme,colorscheme,generator,generate,website,modern,minimalistic,tool,palette,background,foreground,file'/>
          <link rel='canonical' href='https://vimcolors.org' />
          <meta property='og:title' content='Vim colors generator' />
          <meta property='og:site_name' content='vimcolors' />
          <meta property='og:url' content='https://vimcolors.org' />
          <meta property='og:description' content='Choose up to 6 colors of your choisec. Then, generate a custom colorscheme for vim based only on those colors and export it to a vim-compatible file' />
          <meta property='og:type' content='website' />
          <meta property='og:image' content='https://files-ev2m8ckfp.now.sh/' />
          <link rel='apple-touch-icon' sizes='57x57' href='/static/meta/apple-icon-57x57.png' />
          <link rel='apple-touch-icon' sizes='60x60' href='/static/meta/apple-icon-60x60.png' />
          <link rel='apple-touch-icon' sizes='72x72' href='/static/meta/apple-icon-72x72.png' />
          <link rel='apple-touch-icon' sizes='76x76' href='/static/meta/apple-icon-76x76.png' />
          <link rel='apple-touch-icon' sizes='114x114' href='/static/meta/apple-icon-114x114.png' />
          <link rel='apple-touch-icon' sizes='120x120' href='/static/meta/apple-icon-120x120.png' />
          <link rel='apple-touch-icon' sizes='144x144' href='/static/meta/apple-icon-144x144.png' />
          <link rel='apple-touch-icon' sizes='152x152' href='/static/meta/apple-icon-152x152.png' />
          <link rel='apple-touch-icon' sizes='180x180' href='/static/meta/apple-icon-180x180.png' />
          <link rel='icon' type='image/png' sizes='192x192'  href='/static/meta/android-icon-192x192.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/static/meta/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='96x96' href='/static/meta/favicon-96x96.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/static/meta/favicon-16x16.png' />
          <link rel='manifest' href='/static/meta/manifest.json' />
          <meta name='msapplication-TileColor' content='#ffffff' />
          <meta name='msapplication-TileImage' content='/ms-icon-144x144.png' />
          <meta name='theme-color' content='#ffffff' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
