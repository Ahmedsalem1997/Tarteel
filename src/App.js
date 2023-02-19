import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './views/Home/Home';
import Islamic from './views/Islamic/Islamic';
import Profile from './views/Profile/Profile';
import Quran from './views/Quran/Quran';
import Login from './views/Login/Login';
import VerificationCode from './components/VerificationCode/VerificationCode';
import NotFoundPage from './views/NotFoundPage/NotFoundPage';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { langActions } from './store/Lang/Lang';
import { checkAuthLoader } from './utils/Auth';
import BasicLayout from './views/BasicLayout/BasicLayout';
import SubscriptionLogin from './views/SubscriptionLogin/SubscriptionLogin';

function App() {
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
      path: '/',
      element: <BasicLayout />,
      children: [
        {
          path: "/",
          element: < Home />
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "subscription-login",
          element: <SubscriptionLogin />
        },
        {
          path: "users/:id",
          element: <Profile />,
          loader: checkAuthLoader
        },
        {
          path: "islamic",
          element: <Islamic />,
          loader: checkAuthLoader
        },
        {
          path: "quran",
          element: <Quran />,
          loader: checkAuthLoader
        },
        {
          path: "verification-code/:mobile",
          element: <VerificationCode />
        }
      ]
    },
    {
      path: "*",
      element: <NotFoundPage />
    }

  ])
  return (
    <Fragment>
      <RouterProvider router={router} />
    </Fragment>

  );
}

export default App;
