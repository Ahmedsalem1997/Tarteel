import { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import Translate from "../../helpers/Translate/Translate";
import { getAuth, logout } from "../../utils/Auth";



const Navigation = () => {
  const auth = getAuth();
  return (
    // <ul className="navigation-links">
    //   <li><NavLink to="/home" activeclassname="active"><Translate id="navigation.home" /></NavLink></li>
    //   {auth.isAuth && <li><NavLink to={`/users/${auth.loggedUser.id}`} activeclassname="active"><Translate id="navigation.myRecords" /></NavLink></li>}
    //   <li><NavLink to="/islamic" activeclassname="active"><Translate id="navigation.islamicContent" /></NavLink></li>
    //   <li><NavLink to="/quran" activeclassname="active"><Translate id="navigation.quran" /></NavLink></li>
    // </ul>
    <div className="navigation-links">
      <nav class="navbar navbar-expand-sm navbar-dark">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#naviagtion" aria-controls="naviagtion" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="naviagtion">
            <ul class="navbar-nav">
              <li class="nav-item">
                <NavLink to="/home" activeclassname="active"><Translate id="navigation.home" /></NavLink>
              </li>
              {
                (auth?.isAuth && !auth?.loggedUser?.is_sheikh) &&
                <li class="nav-item">
                  <NavLink to={`/users/${auth.loggedUser.id}`} activeclassname="active"><Translate id="navigation.myRecords" /></NavLink>
                </li>
              }
              {
                !auth?.loggedUser?.is_sheikh &&
                <Fragment>
                  <li class="nav-item">
                    <NavLink to="/islamic" activeclassname="active"><Translate id="navigation.islamicContent" /></NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink to="/quran" activeclassname="active"><Translate id="navigation.quran" /></NavLink>
                  </li>
                </Fragment>
              }
              {
                auth.isAuth &&
                <li class="nav-item">
                  <Link to="/" onClick={logout}><Translate id="navigation.logout" /></Link>
                </li>
              }
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navigation;