import { Link } from "react-router-dom";
import { Translate } from "../../helpers/Translate/Translate";

const HomeSection = (props) => {
    function MouseOver(event) {
        event.target.style.background = 'var(--main-color)';
        event.target.style.color = 'var(--white)';

      }
      function MouseOut(event){
        event.target.style.background="";
      }
    return (
        <div className="home-section">
            <header className="home-section-header">
                <h2 className="home-section-header-title"><Translate id={props.header}/></h2>
                { props.showAll && <Link onMouseOver={MouseOver} onMouseOut={MouseOut} className="home-section-header-action" to={props.showAll}><Translate id="button.viewAll" /></Link>}
            </header>
            {props.children}
        </div>
    )
}

export default HomeSection;