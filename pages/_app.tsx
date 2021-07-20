import Layout from 'components/Layout'
import 'tailwindcss/tailwind.css'
import 'styles/global.css'

const App = ({ Component, pageProps }) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
)

export default App
