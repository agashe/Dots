import { redirect, createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { FAQ } from "./pages/FAQ";
import { Terms } from "./pages/Terms";
import { Privacy } from "./pages/Privacy";
import { PageNotFound } from "./pages/errors/PageNotFound";
import { Profile } from "./pages/users/Profile";
import { Layout } from "./components/Layout";
import { NotificationCenter } from "./pages/users/NotificationsCenter";
import { EditProfile } from "./pages/users/EditProfile";

export const router = createBrowserRouter([
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
        path: "profile",
        Component: Profile,
      },
      {
        path: "edit-profile",
        loader: protectedLoader,
        Component: EditProfile,
      },
      {
        path: "notifications",
        loader: protectedLoader,
        Component: NotificationCenter,
      },
      {
        path: "*",
        Component: PageNotFound,
      },
    ],
  }
]);

async function protectedLoader() {
  if (!localStorage.getItem('user')) {
    return redirect("/");
  }

  return null;
}