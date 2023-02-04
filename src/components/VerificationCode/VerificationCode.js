import { Link } from "react-router-dom";
import LoginWrapper from "../LoginWrapper/LoginWrapper";
import Translate from '../../helpers/Translate/Translate';
const VerificationCode = () => {
  return (
    <LoginWrapper>
      <div className="verification-code-form-header">
        <p><Translate id="verificationCode.sent" /></p>
      </div>
      <div className="verification-code-form-inputs">
        <input type="text" className="trans-input" maxLength="1"></input>
        <input type="text" className="trans-input" maxLength="1"></input>
        <input type="text" className="trans-input" maxLength="1"></input>
        <input type="text" className="trans-input" maxLength="1"></input>
      </div>

      <div className="verification-code-form-actions">
        <button className="main-button"><Translate id="button.send" /></button>
      </div>
      <div className="verification-code-form-cancel">
        <Link className="cancel-btn" to="/">
          <Translate id="button.cancel"/>
        </Link>
      </div>
    </LoginWrapper>
  );
};

export default VerificationCode;
