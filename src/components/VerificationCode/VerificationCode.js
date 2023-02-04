import { Link } from "react-router-dom";
import LoginWrapper from "../LoginWrapper/LoginWrapper";

const VerificationCode = () => {
  return (
    <LoginWrapper>
      <div className="verification-code-form-header">
        <p>تم ارسال الرمز</p>
      </div>
      <div className="verification-code-form-inputs">
        <input type="text" className="trans-input" maxLength="1"></input>
        <input type="text" className="trans-input" maxLength="1"></input>
        <input type="text" className="trans-input" maxLength="1"></input>
        <input type="text" className="trans-input" maxLength="1"></input>
      </div>

      <div className="verification-code-form-actions">
        <button className="main-button">ارسال</button>
      </div>
      <div className="verification-code-form-cancel">
        <Link className="cancel-btn" to="/">
          الغاء
        </Link>
      </div>
    </LoginWrapper>
  );
};

export default VerificationCode;
