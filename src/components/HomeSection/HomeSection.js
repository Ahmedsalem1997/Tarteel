import { Link } from "react-router-dom";

const HomeSection = (props) => {
    return (
        <div>
            <header className="home-section-header">
                <h2 className="home-section-header-title">{props.header}</h2>
                <Link className="home-section-header-action" to={props.showAll}>رؤية الكل</Link>
            </header>
            {props.children}
        </div>
    )
}

export default HomeSection;