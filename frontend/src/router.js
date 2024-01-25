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
import { Community } from "./pages/posts/Community";
import { User as UserPosts} from "./pages/posts/User";
import { Tag as TagPosts} from "./pages/posts/Tag";
import { Search } from "./pages/Search";
import { Create as CreatePost } from "./pages/posts/Create";
import { Edit as EditPost } from "./pages/posts/Edit";

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
        Component: Home,
      },
      {
        path: "/s/:keyword",
        Component: Search,
      },
      {
        path: "/c/:name",
        Component: Community,
      },
      {
        path: "/u/:id/:name",
        Component: UserPosts,
      },
      {
        path: "/t/:name",
        Component: TagPosts,
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
        path: "edit-community",
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
  }
]);

async function protectedLoader() {
  if (!localStorage.getItem('user')) {
    return redirect("/");
  }

  return null;
}