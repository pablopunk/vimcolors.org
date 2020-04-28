import App from 'next/app'
import Head from 'next/head'
import React from 'react'
import Layout from '../components/Layout'

export default class MyApp extends App {
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
