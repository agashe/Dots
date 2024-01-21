import {
  redirect,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { ChakraProvider, extendTheme, defineStyleConfig } from '@chakra-ui/react';

import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { FAQ } from "./pages/FAQ";
import { Terms } from "./pages/Terms";
import { Privacy } from "./pages/Privacy";
import { SignIn } from "./pages/auth/SignIn";
import { PageNotFound } from "./pages/errors/PageNotFound";
import { Profile } from "./pages/users/Profile";
import { Layout } from "./components/Layout";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "FAQ",
        Component: FAQ,
      },
      {
        path: "terms-of-usage",
        Component: Terms,
      },
      {
        path: "privacy-policy",
        Component: Privacy,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "sign-in",
        loader: signInLoader,
        Component: SignIn,
      },
      {
        path: "profile",
        loader: protectedLoader,
        Component: Profile,
      },
      {
        path: "*",
        Component: PageNotFound,
      },
    ],
  }
]);

const Button = defineStyleConfig({
  variants: {
    outline: {
      border: '2px solid',
      borderColor: 'brand.main',
      color: 'brand.main',
    },
    solid: {
      bg: 'brand.main',
      color: 'white',
      _hover: {
        bg: 'brand.200',
        color: 'white',
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
    }
  },
  components: {
    Button,
  },
});

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

async function signInLoader() {
  if (!localStorage.getItem('user')) {
    return null;
  }

  return redirect("/");
}

async function protectedLoader() {
  if (!localStorage.getItem('user')) {
    return redirect("/");
  }

  return null;
}
