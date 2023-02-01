import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <ul className="navigation-links">
          <li className="active"><Link to="/">الرئيسية</Link></li>
          <li><Link to="/">تسجيلاتي</Link></li>
          <li><Link to="/">محتوى إسلامي</Link></li>
          <li><Link to="/">القرآن</Link></li>
        </ul>
    )
}

export default Navigation;