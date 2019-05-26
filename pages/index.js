import Layout from '../components/Layout'
import Terminal from '../components/terminal'
import ForkMe from 'react-github-fork-ribbon'

export default () =>
  <Layout>
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
      <p>
        <h2>1. </h2>
        Choose below your favorite colors and they
        will become a vim colorscheme!
      </p>
      <Terminal />
      <p>
        <h2>2. </h2>
        Now you can <pre>:source "path/to/your/file.vim"</pre> inside vim or neovim.
      </p>
      <p>Alternatively, you can publish it via github and use it as any other plugin. Check out <a href="https://github.com/pablopunk/sick.vim">this one</a> as a simple example.</p>
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
        display: inline;
      }
      small {
        background-color: aquamarine;
        color: #333;
        padding: 2px;
      }
      pre {
        display: inline;
        font-size: 1.4em;
        color: royalblue;
      }
      a {
        color: tomato;
        text-decoration: none;
      }
    `}</style>
  </Layout>
