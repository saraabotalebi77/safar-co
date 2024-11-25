import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./presentation/main-module/pages/home";
import App from "./App";
import Profile from "./presentation/profile-modules/pages/profile";
import EditProfile from "./presentation/profile-modules/pages/edit-profile";
import Notification from "./presentation/profile-modules/pages/notification";
import Tickets from "./presentation/profile-modules/pages/tickets";
import ErrorPage from "./presentation/pages/error-page";
import Ticket from "./presentation/profile-modules/pages/ticket";
import AddTicket from "./presentation/profile-modules/pages/add-ticket";
import { getCookie } from "./presentation/shared/utils/cookie";
import Articels from "./presentation/articles-module/pages/articles";
import Article from "./presentation/articles-module/pages/article";
import AddArticle from "./presentation/profile-modules/pages/add-article";
import UserArticles from "./presentation/profile-modules/pages/articles";
import EditArticle from "./presentation/profile-modules/pages/edit-article";

const PrivateComponents = () => {
  const token = getCookie("safarCo:user_key");
  return token ? <Outlet /> : <Navigate to="/" replace />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route path="/articles" element={<Articels/>}/>
      <Route path="/articles/:articleId" element={<Article/>} />
      <Route path="/profile" element={<PrivateComponents/>}>
        <Route path="/profile" element={<Profile />}>
          <Route index element={<EditProfile />} />
          <Route path="/profile/notification" element={<Notification />} />
          <Route path="/profile/tickets" element={<Tickets />} />
          <Route path="/profile/tickets/:ticketId" element={<Ticket/>} />
          <Route path="/profile/add-ticket" element={<AddTicket/>} />
          <Route path="/profile/articles/add-article" element={<AddArticle/>} />
          <Route path="/profile/articles/edit-article/:articleId" element={<EditArticle/>}/>
          <Route path="/profile/articles" element={<UserArticles/>} />
        </Route>
      </Route>

    </Route>
  )
);

export default router;
