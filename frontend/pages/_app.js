import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { RecoilRoot } from 'recoil';

export default function App(props) {
    const { Component, pageProps } = props;

    return (
        <>
            <Head>
                <title>Task Scheduler</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>

            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    colorScheme: 'dark',
                }}
            >
                <RecoilRoot>
                    <Component {...pageProps} />
                </RecoilRoot>
            </MantineProvider>
        </>
    );
}