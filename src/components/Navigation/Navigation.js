import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Translate from "../../helpers/Translate/Translate";
import { getAuth } from "../../utils/Auth";



const Navigation = () => {
  const { isAuth } = getAuth();
  return (
    <ul className="navigation-links">
      <li><NavLink to="/" activeclassname="active"><Translate id="navigation.home" /></NavLink></li>
      {isAuth && <li><NavLink to="/profile" activeclassname="active"><Translate id="navigation.myRecords" /></NavLink></li>}
      <li><NavLink to="/islamic" activeclassname="active"><Translate id="navigation.islamicContent" /></NavLink></li>
      <li><NavLink to="/quran" activeclassname="active"><Translate id="navigation.quran" /></NavLink></li>
    </ul>
  )
}

export default Navigation;