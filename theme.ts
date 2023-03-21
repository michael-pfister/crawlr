// theme.ts

// 1. import `extendTheme` function
import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  transparent: "transparent",
  black: "#191516",
  white: "#FFFBFE",
  blue: "#81F7E5",
  violet: "#3943B7",
  red: "#E63946",
};

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
  disableTransitionOnChange: false,
};

const styles = {
  global: (props: any) => ({
    body: {
      color: mode("#191516", "#F2F2F2")(props),
      bg: mode("#F2F2F2", "#191516")(props),
    },
  }),
};

// 3. extend the theme
const theme = extendTheme({ colors, config, styles });

export default theme;
