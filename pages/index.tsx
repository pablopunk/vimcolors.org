import React, { useState } from 'react'
import Head from 'next/head'
import ForkMe from 'react-github-fork-ribbon'
import Layout from '../components/Layout'
import Terminal from '../components/terminal'
import styled from 'styled-components'

const StyledTop = styled.div``

const ToggleThemeButton = styled.button`
  background: transparent;
  border: transparent;
  outline: none;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    opacity: 0.7;
  }
`

const StyledH2 = styled.h2`
  color: royalblue;
  .dark & {
    color: DarkTurquoise;
  }
  display: inline;
`

const InlineP = styled.p`
  display: inline;
`

const StyledCode = styled.code`
  font-size: 1.4em;
  color: royalblue;
  .dark & {
    color: DarkTurquoise;
  }
`

const StyledButton = styled.button`
  margin: 1em;
  font-family: 'SF Mono', Menlo, monospace;
  padding: 0.5em 2em;
  border-radius: 3px;
  cursor: pointer;
  background-color: white;
  border: 1px solid gray;
  color: black;

  &:hover {
    color: royalblue;
  }

  .dark & {
    background-color: #333;
    border: 1px solid #555;
    color: white;

    &:hover {
      color: DarkTurquoise;
    }
  }
`

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 2rem;

  & h1 {
    color: tomato;
    margin-bottom: 5px;
  }

  & article {
    margin-top: 1em;
  }

  & small {
    background-color: aquamarine;
    color: #333;
    padding: 2px;
  }

  & a {
    color: tomato;
    text-decoration: none;
  }

  & ul {
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    text-align: center;
  }
`

export default () => (
  <Layout>
    <Head>
      <title>Vim colors | Generate your custom colorscheme</title>
    </Head>
    <StyledTop>
      <ToggleThemeButton
        onClick={() => {
          window['__toggleDarkMode']?.()
        }}
      >
        💡
      </ToggleThemeButton>
    </StyledTop>
    <StyledContainer>
      <a href="/">
        <h1>Vim Colors</h1>
      </a>
      <small>`Generate your own vim colorschemes`</small>
      <article>
        <StyledH2>1. </StyledH2>
        <InlineP>
          Choose below your favorite colors and they will become a vim
          colorscheme!
        </InlineP>
      </article>
      <Terminal />
      <article>
        <StyledH2>2. </StyledH2>
        <InlineP>
          Now you can <StyledCode>:source 'path/to/your/file.vim'</StyledCode>{' '}
          inside vim or neovim.
        </InlineP>
      </article>
      <InlineP>
        Alternatively, you can publish it via github and use it as any other
        plugin. Checkout the examples below.
      </InlineP>
      <section>
        <h3>Some examples of generated schemes</h3>
        <ul>
          <li>
            <a href="https://github.com/pablopunk/sick.vim">sick.vim</a>
          </li>
          <li>
            <a href="https://github.com/pablopunk/sunset.vim">sunset.vim</a>
          </li>
        </ul>
      </section>
    </StyledContainer>
  </Layout>
)
