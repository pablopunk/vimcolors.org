
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
          <link rel='canonical' href='https://vimcolors.org' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
