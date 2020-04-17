import App from 'next/app'
import Head from 'next/head'
import React from 'react'
import Layout from '../components/Layout'

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Layout>
        <Head>
          <title>Vim colors | Generate your custom colorscheme</title>
        </Head>
        <Component {...pageProps} />
      </Layout>
    )
  }
}
