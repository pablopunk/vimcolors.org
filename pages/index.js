import React, { useState } from 'react'
import ForkMe from 'react-github-fork-ribbon'
import Terminal from '../components/terminal'
import { generate } from '../lib/file'

export default () => {
  const [theme, setTheme] = useState('dark')

  function toggleTheme () {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return <div>
    <div className='container'>
      <ForkMe
        position='right'
        color='black'
        href='//github.com/pablopunk/vimcolors.org'
        target='_blank'
      >
          Source on GitHub
      </ForkMe>
      <a href="/">
        <h1>Vim Colors</h1>
      </a>
      <small>`Generate your own vim colorschemes`</small>
      <article>
        <h2>1. </h2>
        <p>
            Choose below your favorite colors and they
            will become a vim colorscheme!
        </p>
      </article>
      <article>
        <button onClick={() => toggleTheme()}>
          Toggle dark/light
        </button>
      </article>
      <Terminal theme={theme}/>
      <article>
        <h2>2. </h2>
        <p>
            Now you can <code>:source "path/to/your/file.vim"</code> inside vim or neovim.
        </p>
      </article>
      <p>Alternatively, you can publish it via github and use it as any other plugin. Check out <a href="//github.com/pablopunk/sick.vim">this one</a> as a simple example.</p>
    </div>
    <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        h1 {
          color: tomato;
          margin-bottom: 5px;
        }
        h2 {
          color: royalblue;
        }
        h2, p {
          display: inline;
        }
        article {
          margin-top: 1em;
        }
        small {
          background-color: aquamarine;
          color: #333;
          padding: 2px;
        }
        code {
          font-size: 1.4em;
          color: royalblue;
        }
        a {
          color: tomato;
          text-decoration: none;
        }
        button {
          margin: 1em;
          font-family: 'SF Mono', Menlo, monospace;
          padding: .5em 2em;
          border-radius: 3px;
          background-color: white;
          border: 1px solid gray;
        }
        button:hover {
          color: royalblue;
          cursor: pointer;
        }
      `}</style>
  </div>
}
