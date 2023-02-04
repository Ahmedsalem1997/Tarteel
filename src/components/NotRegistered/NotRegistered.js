import { Link } from "react-router-dom";
import LoginWrapper from "../LoginWrapper/LoginWrapper";
import Translate from "../../helpers/Translate//Translate";
const NotRegistered = () => {
  return (
    <LoginWrapper>
      <div className="not-registered-header">
        <h3><Translate id="notRegistered.title"/></h3>
        <p><Translate id="notRegistered.pleaseRegister"/></p>
      </div>
      <div className="not-registered-actions">
        <button className="main-button"><Translate id="button.login"/></button>
        <button className="trans-btn"><Translate id="button.register"/></button>
      </div>
      <div className="not-registered-cancel">
        <Link className="cancel-btn" to="/"><Translate id="button.cancel"/></Link>
      </div>
    </LoginWrapper>
  );
};

export default NotRegistered;
