import { MetersProvider } from '@/context/useMetersContext';

import type { AppProps } from 'next/app';
import '@/styles/global.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <MetersProvider>
          <Component {...pageProps} />
      </MetersProvider>
    </>
  );
}
