import React from 'react'
import Head from 'next/head'
import ReactGA from 'react-ga'

export default class extends React.Component {
  componentDidMount () {
    ReactGA.initialize('UA-106008527-4')
    ReactGA.pageview(document.location.pathname)
  }

  render () {
    return <div>
      <Head>
        <title>Vim Colors</title>
        <meta
          name='viewport'
          content='width=device-width, user-scalable=no'
        />
      </Head>
      <main>{ this.props.children }</main>
      <style jsx>{`
        main {
          max-width: 1000px;
          margin: 0 auto;
          padding: 1em;
          font-family: 'SF Mono', Menlo, monospace;
        }
      `}</style>
    </div>
  }
}
