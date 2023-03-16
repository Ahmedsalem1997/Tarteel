import { Fragment } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Translate from "../../helpers/Translate/Translate";
import { getAuth, logout } from "../../utils/Auth";



const Navigation = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const logUserOut = () => {
    logout();
    navigate('/');
    window.location.reload(false);
  }
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
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navigation;