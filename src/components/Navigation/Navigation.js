import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <ul className="navigation-links">
          <li><NavLink to="/" activeclassname="active">الرئيسية</NavLink></li>
          <li><NavLink to="/login" activeclassname="active">تسجيلاتي</NavLink></li>
          <li><NavLink to="/islamic" activeclassname="active">محتوى إسلامي</NavLink></li>
          <li><NavLink to="/quran" activeclassname="active">القرآن</NavLink></li>
        </ul>
    )
}

export default Navigation;