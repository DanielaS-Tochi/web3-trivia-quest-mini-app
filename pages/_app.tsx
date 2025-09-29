import Head from 'next/head';
import type { AppProps } from 'next/app';
import '../src/index.css';
import React from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  return (
    <React.StrictMode>
      <Head>
        {/* Meta tags básicos */}
        <title>Web3 Trivia Quest</title>
        <meta name="description" content="Aprende Web3 mientras compites" />
        
        {/* Meta tags específicos para Farcaster Frame */}
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content={`${appUrl}/api/og`} />
        <meta property="fc:frame:button:1" content="Comenzar Trivia" />
        <meta property="fc:frame:button:1:action" content="post" />
        <meta property="fc:frame:post_url" content={`${appUrl}/api/frame`} />
        
        {/* Open Graph meta tags */}
        <meta property="og:title" content="Web3 Trivia Quest" />
        <meta property="og:description" content="¡Juega y aprende sobre Web3!" />
        <meta property="og:image" content={`${appUrl}/api/og`} />
      </Head>
      <Component {...pageProps} />
    </React.StrictMode>
  );
}
