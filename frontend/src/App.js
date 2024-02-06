import {
  ChakraProvider,
  extendTheme,
  defineStyleConfig,
} from "@chakra-ui/react";
import {  MultiSelectTheme } from 'chakra-multiselect'
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { SEO } from "./components/SEO";

const Button = defineStyleConfig({
  variants: {
    outline: {
      border: "2px solid",
      borderColor: "brand.main",
      color: "brand.main",
    },
    solid: {
      bg: "brand.main",
      color: "white",
      _hover: {
        bg: "brand.200",
        color: "white",
      },
    },
  },
});

const theme = extendTheme({
  colors: {
    brand: {
      main: "#D90f19",
      100: "#C30E17",
      200: "#AE0C14",
      300: "#980B12",
      400: "#82090F",
      500: "#6D080D",
      600: "#57060A",
      700: "#410407",
      800: "#2B0305",
      900: "#160102",
    },
  },
  components: {
    Button,
    MultiSelect: MultiSelectTheme,
  },
});

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <SEO info={{}} />
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}
