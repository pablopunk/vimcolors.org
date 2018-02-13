import Layout from '../components/Layout'
import Terminal from '../components/terminal'

export default () =>
  <Layout>
    <div className='container'>
      <h1>Vim Colors</h1>
      <p>
        Choose below your favorite colors and they
        will become a vim colorscheme!
      </p>
      <Terminal />
    </div>
    <style jsx>{`
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      h1 {
        color: tomato;
      }
    `}</style>
  </Layout>
