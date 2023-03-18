import "@/styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css"; 
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Roboto } from "next/font/google";
import AppBar from "@/components/AppBar";
import theme from "@/theme";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

// 3. Pass the `theme` prop to the `ChakraProvider`
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
        <AppBar />
        <main className={roboto.className}>
          <Component {...pageProps} />
        </main>
    </ChakraProvider>
  );
}
