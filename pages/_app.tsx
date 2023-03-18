import "@/styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import AppBar from "@/components/AppBar";
import theme from "@/theme";
import { Roboto } from 'next/font/google'

const roboto = Roboto({ weight: ['400', '700'],subsets: ['latin'] })

// 3. Pass the `theme` prop to the `ChakraProvider`
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <style jsx global>{`
        html, body {
          font-family: ${roboto.style.fontFamily} !important;
        }
      `}</style>
    <ChakraProvider theme={theme}>
        <AppBar />
        <main>
          <Component {...pageProps} />
        </main>
    </ChakraProvider>
    </>
  );
}
