import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  )
}
export default MyApp
