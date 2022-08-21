import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react';
import PageLayout from '../components/pageLayout';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ChakraProvider>
      {
        Component.authPage ? (
          <Component {...pageProps} />
        ) : (
          <PageLayout>
            <Component {...pageProps} />
          </PageLayout>
        )
      }
    </ChakraProvider>
  )
}

export default MyApp
