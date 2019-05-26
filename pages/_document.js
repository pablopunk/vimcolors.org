
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    return (
      <html lang="en">
        <Head>
          <title>Vim colors | Generate your custom colorscheme</title>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta name='description' content='Generate your custom colorscheme for vim and export it to a vim-compatible file' />
          <meta name='keywords' content='vim,colors,scheme,colorscheme,generator,generate,website,modern,minimalistic,tool,palette,background,foreground,file'/>
          <link rel='canonical' href='https://vimcolors.org' />
          <meta property="og:title" content="Vim colors generator" />
          <meta property="og:site_name" content="vimcolors" />
          <meta property="og:url" content="https://vimcolors.org" />
          <meta property="og:description" content="Generate your own vim colorschemes and export them into a file" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="https://files-ev2m8ckfp.now.sh/" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
