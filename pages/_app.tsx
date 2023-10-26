import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'
import LoginModal from '@/components/Modals/LoginModal'
import RegisterModal from '@/components/Modals/RegisterModal'
import  {Toaster} from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <SessionProvider session={pageProps.session} >
      <Toaster/>
       <LoginModal/>
       <RegisterModal/>
      <Layout>
         <Component {...pageProps} />
       </Layout>
    </SessionProvider>
    </>
  )
}
