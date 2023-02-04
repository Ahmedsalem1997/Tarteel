import { Link } from "react-router-dom";
import Translate from "../../helpers/Translate//Translate";
import BlackBlock from "../BlackBlock/BlackBlock";
const NotRegistered = (props) => {
  return (
    <BlackBlock>
      <div className="not-registered-header">
        <h3><Translate id="notRegistered.title"/></h3>
        <p><Translate id="notRegistered.pleaseRegister"/></p>
      </div>
      <div className="not-registered-actions">
        <Link to="/login"><button className="main-button"><Translate id="button.login"/></button></Link>
        <Link to="/login"><button className="trans-btn"><Translate id="button.register"/></button></Link>
      </div>
      <div className="not-registered-cancel">
        <Link className="cancel-btn" to="/" onClick={() => props.setIsOpen(false)}><Translate id="button.cancel"/></Link>
      </div>
    </BlackBlock>
  );
};

export default NotRegistered;
