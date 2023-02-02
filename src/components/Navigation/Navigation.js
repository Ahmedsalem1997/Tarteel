import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <ul className="navigation-links">
          <li><NavLink to="/" activeClassName="active">الرئيسية</NavLink></li>
          <li><NavLink to="/login" activeClassName="active">تسجيلاتي</NavLink></li>
          <li><NavLink to="/islamic" activeClassName="active">محتوى إسلامي</NavLink></li>
          <li><NavLink to="/quran" activeClassName="active">القرآن</NavLink></li>
        </ul>
    )
}

export default Navigation;