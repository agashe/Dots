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
import { Create as CreateCommunity } from "./pages/communities/Create";
import { Edit as EditCommunity } from "./pages/communities/Edit";
import { Search } from "./pages/Search";
import { Create as CreatePost } from "./pages/posts/Create";
import { Edit as EditPost } from "./pages/posts/Edit";
import { Show as ShowPost } from "./pages/posts/Show";

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
        path: "/p/:id/:title",
        Component: ShowPost,
      },
      {
        path: "/s/:keyword",
        Component: Search,
      },
      {
        path: "/c/:name",
        Component: Home,
      },
      {
        path: "/u/:id/:name",
        Component: Home,
      },
      {
        path: "/t/:name",
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
        loader: protectedLoader,
        Component: Profile,
      },
      {
        path: "edit-profile",
        loader: protectedLoader,
        Component: EditProfile,
      },
      {
        path: "create-community",
        loader: protectedLoader,
        Component: CreateCommunity,
      },
      {
        path: "edit-community/:name",
        loader: protectedLoader,
        Component: EditCommunity,
      },
      {
        path: "create-post",
        loader: protectedLoader,
        Component: CreatePost,
      },
      {
        path: "edit-post",
        loader: protectedLoader,
        Component: EditPost,
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
  },
]);

async function protectedLoader() {
  if (!localStorage.getItem("user")) {
    return redirect("/");
  }

  return null;
}
