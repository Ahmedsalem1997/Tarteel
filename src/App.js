import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import Home from './views/Home/Home';
import Islamic from './views/Islamic/Islamic';
import Profile from './views/Profile/Profile';
import Quran from './views/Quran/Quran';
import Login2 from './views/Login2/Login2';
import Login from './components/Login/Login';
import VerificationCode from './components/VerificationCode/VerificationCode';
import NotFoundPage from './views/NotFoundPage/NotFoundPage';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { langActions } from './store/Lang/Lang';
import { checkAuthLoader } from './utils/Auth';
import AdminLogin from './views/AdminLogin/AdminLogin';
import BasicLayout from './views/BasicLayout/BasicLayout';
import { modalsActions } from "./store/Modals/Modals";
import { getAuth } from "./utils/Auth";


function App() {

  function checkAuthLoader() {
    const { token } = getAuth();
    if (!token) {
      dispatch(modalsActions.openLoginModal());
      return redirect("/home");
    }
    return null;
  }

  const globalLang = useSelector((state) => {
    return state.lang.globalLang;
  });
  const [lang, setLang] = useState(localStorage.getItem("lang"));
  const dispatch = useDispatch();
  const rootEle = document.getElementById("root-html");

  useEffect(() => {
    if (!lang) {
      setLang(rootEle.getAttribute("lang"));
    }
    dispatch(langActions.translation({ type: "translation", lang: lang }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    if (globalLang === "ar") {
      rootEle.setAttribute("dir", "rtl");
    }
    if (globalLang === "en") {
      rootEle.removeAttribute("dir");
    }
    rootEle.setAttribute("lang", globalLang);
    localStorage.setItem("lang", globalLang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalLang]);
  const router = createBrowserRouter([
    {
      path: "login",
      element: <Login />
    },
    {
      path: "/",
      element: <BasicLayout />,
      children: [
        {
          path: "",
          loader: () => redirect("/home"),
        },
        {
          path: "home",
          element: <Home />,
        },

        // {
        //   path: "subscription-login",
        //   element: <SubscriptionLogin />
        // },
        {
          path: "users/:id",
          element: <Profile />,
          loader: checkAuthLoader,
        },
        {
          path: "islamic",
          element: <Islamic />,
          loader: checkAuthLoader,
        },
        {
          path: "quran",
          element: <Quran />,
          loader: checkAuthLoader,
        },
        {
          path: "verification-code/:mobile",
          element: <VerificationCode />,
        },
        {
          path: "shekh-login",
          element: <AdminLogin />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);
  return (
    <Fragment>
      <RouterProvider router={router} />
    </Fragment>
  );
}

export default App;
