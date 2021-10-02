import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import theme from '../theme';
import { createUrqlClient } from '../utils/createUrqlClient';

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default withUrqlClient(createUrqlClient, { ssr: true })(MyApp);
