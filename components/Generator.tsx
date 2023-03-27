import { Terminal } from './Terminal'
import styled from 'styled-components'

const StyledCode = styled.code`
  font-size: 1.4em;
  color: var(--color-accent);
  .dark & {
    color: DarkTurquoise;
  }
`

export const Generator = () => (
  <div className="flex flex-col items-center">
    <a href="/">
      <h1 className="text-3xl text-accent-alt my-3">Vim Colors</h1>
    </a>
    <h2 className="mb-3 bg-accent text-bg px-2 text-md text-center">
      `Generate your own vim colorschemes`
    </h2>
    <article className="bg-bg2 py-5 px-4 rounded-xl shadow-lg">
      <h3 className="inline text-accent text-xl mr-2">1.</h3>
      <span>
        Choose below your favorite colors and they will become a vim
        colorscheme!
      </span>
      <Terminal />
    </article>
    <article className="bg-bg2 py-5 px-4 rounded-xl shadow-lg mt-4">
      <h3 className="inline text-accent text-xl mr-2">2.</h3>
      <span>
        Now you can <StyledCode>:source 'path/to/your/file.vim'</StyledCode>{' '}
        inside vim or neovim.
      </span>
    </article>
    <span className="mt-6">
      Alternatively, you can publish it via github and use it as any other
      plugin. Checkout the examples below:
    </span>
    <section className="self-start my-3">
      <h4 className="font-semibold">Generated themes</h4>
      <ul className="text-accent-alt font-semibold underline">
        <li>
          <a href="https://github.com/pablopunk/sick.vim">sick.vim</a>
        </li>
        <li>
          <a href="https://github.com/pablopunk/sunset.vim">sunset.vim</a>
        </li>
      </ul>
    </section>
  </div>
)
