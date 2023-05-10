import globalStyles from '@/styles/globals';

import { Global, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux'; // reduximport { store } from '@/store/store';
import { store } from '@/store/store';
import theme from '@/styles/theme';
import Layout from '@/layout/Layout';

export default function App({ Component, pageProps }: AppProps) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <Global styles={globalStyles} />
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                    <ReactQueryDevtools position={'bottom-right'} />
                </QueryClientProvider>
            </Provider>
        </ThemeProvider>
    );
}
