import { useEffect } from "react";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Translate from "../../helpers/Translate/Translate";
import { langActions } from "../../store/Lang/Lang";
import { getAuth, logout } from "../../utils/Auth";



const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();
  const [selectedLang, setSelectedLang] = useState('ar');
  const globalLang = useSelector((state) => {
    return state.lang.globalLang;
  });
  const logUserOut = () => {
    logout();
    navigate('/');
    window.location.reload(false);
  }

  const langChangeHandler = (e) => {
    setSelectedLang(e.target.value);
    console.log(e.target.value);
    dispatch(langActions.translation({ lang: e.target.value }));
  }

  useEffect(() => {
    setSelectedLang(globalLang);
  }, [globalLang])
  return (
    // <ul className="navigation-links">
    //   <li><NavLink to="/home" activeclassname="active"><Translate id="navigation.home" /></NavLink></li>
    //   {auth.isAuth && <li><NavLink to={`/users/${auth.loggedUser.id}`} activeclassname="active"><Translate id="navigation.myRecords" /></NavLink></li>}
    //   <li><NavLink to="/islamic" activeclassname="active"><Translate id="navigation.islamicContent" /></NavLink></li>
    //   <li><NavLink to="/quran" activeclassname="active"><Translate id="navigation.quran" /></NavLink></li>
    // </ul>
    <div className="navigation-links">
      <nav className="navbar navbar-expand-md navbar-dark">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#naviagtion" aria-controls="naviagtion" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="naviagtion">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to="/home" activeclassname="active"><Translate id="navigation.home" /></NavLink>
              </li>
              {
                (auth?.isSubscribed && !auth?.loggedUser?.is_sheikh) &&
                <li className="nav-item">
                  <NavLink to={`/users/${auth.loggedUser.id}`} activeclassname="active"><Translate id="navigation.myRecords" /></NavLink>
                </li>
              }
              {
                !auth?.loggedUser?.is_sheikh &&
                <Fragment>
                  <li className="nav-item">
                    <NavLink to="/islamic" activeclassname="active"><Translate id="navigation.islamicContent" /></NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/quran" activeclassname="active"><Translate id="navigation.quran" /></NavLink>
                  </li>
                </Fragment>
              }
              {
                auth.isSubscribed &&
                <li className="nav-item">
                  <Link to="/" onClick={logUserOut}><Translate id="navigation.logout" /></Link>
                </li>
              }
              <li className="nav-item">
                {/* <Link class="nav-link dropdown-toggle" data-bs-toggle="dropdown" to="" role="button" aria-expanded="false">Dropdown</Link>
                <ul class="dropdown-menu">
                  <li><Link class="dropdown-item" href="#">English</Link></li>
                  <li><Link class="dropdown-item" href="#">Arabic</Link></li>
                </ul> */}
                <Link>
                  <i className="fa-solid fa-globe mx-2"></i>
                  <select className="lang-select" name='langSelect' value={selectedLang} onChange={langChangeHandler} >
                    <option value='ar'>عربي</option>
                    <option value='en'>English</option>
                  </select>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navigation;