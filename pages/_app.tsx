import type { AppProps } from 'next/app'
import '../styles/globals.css'
import '../styles/fonts/fonts.css'

const MyApp = ({ Component, pageProps }: AppProps ) => {

  return <Component {...pageProps}/>
}

export default MyApp
