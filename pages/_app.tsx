import type { AppProps } from "next/app";
import Layout from "components/Layout";
import "tailwindcss/tailwind.css";
import "styles/global.css";

const App = ({ Component, pageProps }: AppProps) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

export default App;
