import '@assets/main.css';
import '@assets/chrome-bug.css';
import 'keen-slider/keen-slider.min.css';

import { FC, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { CommerceProvider } from '@framework';
import useCart from '@framework/cart/use-cart';

import { Head } from '@components/common';
import { ManagedUIContext } from '@components/ui/context';

import userData from '@config/user_data.json';

const user = userData[Math.floor(Math.random() * userData.length)];

const Noop: FC = ({ children }) => <>{children}</>;

const CartWatcher = () => {
  const { data: cartData } = useCart();
  useEffect(() => {
    if (!cartData) {
      return;
    }

  }, [cartData]);

  return null;
};

export default function MyApp({ Component, pageProps }: AppProps) {
  const { locale = 'en-US' } = useRouter();

  const Layout = (Component as any).Layout || Noop;

  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);

  return (
    <>
      <CommerceProvider locale={locale}>
        <Head />
        <ManagedUIContext>
          <CartWatcher />
          <Layout pageProps={pageProps}>
            <Component {...pageProps} />
          </Layout>
        </ManagedUIContext>
      </CommerceProvider>
    </>
  );
}
