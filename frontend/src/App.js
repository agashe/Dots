import {
  Outlet,
  redirect,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { SignIn } from "./pages/auth/SignIn";
import { PageNotFound } from "./pages/errors/PageNotFound";
import { Profile } from "./pages/users/Profile";

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

export default function App() {
  return <RouterProvider router={router} />;
}

function Layout() {
  function signOut() {
    localStorage.removeItem('user');

    window.location.href = "/";
  }

  return (
    <div>
      <header>
        <a href="/">home</a> | 
        <a href="/about">about</a> | 
        <a href="/contact">contact</a>

        <div style={{float: 'right'}}>
          {
            localStorage.getItem('user') ?
              <>
                <a href="/profile">profile</a> | 
                <button onClick={signOut}>sign-out</button>
              </>
              :
              <a href="/sign-in">sign-in</a>
          } 
        </div>
      </header>

      <Outlet />
    </div>
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
