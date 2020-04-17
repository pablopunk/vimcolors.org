import React, { useState } from 'react'
import ForkMe from 'react-github-fork-ribbon'
import Terminal from '../components/terminal'

export default () => {
  const [theme, setTheme] = useState('dark')

  function toggleTheme() {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return (
    <div>
      <div className="container">
        <ForkMe
          position="right"
          color="black"
          href="//github.com/pablopunk/vimcolors.org"
          target="_blank"
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
            Choose below your favorite colors and they will become a vim
            colorscheme!
          </p>
        </article>
        <article>
          <button onClick={() => toggleTheme()}>Toggle dark/light</button>
        </article>
        <Terminal theme={theme} />
        <article>
          <h2>2. </h2>
          <p>
            Now you can <code>:source 'path/to/your/file.vim'</code> inside vim
            or neovim.
          </p>
        </article>
        <p>
          Alternatively, you can publish it via github and use it as any other
          plugin. Checkout the examples below.
        </p>
      </div>
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
        h2,
        p {
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
          padding: 0.5em 2em;
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
  )
}
