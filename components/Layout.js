import Head from 'next/head'

export default ({ children }) =>
  <div>
    <Head>
      <title>Vim Colors</title>
      <meta
        name='viewport'
        content='width=device-width, user-scalable=no'
      />
    </Head>
    <main>{ children }</main>
    <style jsx>{`
      main {
        max-width: 1000px;
        margin: 0 auto;
        padding: 1em;
        font-family: 'SF Mono', Menlo, monospace;
      }
    `}</style>
  </div>
