import { Link } from "react-router-dom";

const VerifitionWrapper = () => {
  return (
    <div className="verification-wrapper">
      <div className="verification-wrapper-form">
        <div className="verification-wrapper-form-header">
          <p>تم ارسال الرمز</p>
        </div>
        <div className="verification-wrapper-form-inputs">
          <input className="verification-wrapper-form-input"></input>
          <input className="verification-wrapper-form-input"></input>
          <input className="verification-wrapper-form-input"></input>
          <input className="verification-wrapper-form-input"></input>
        </div>

        <div className="verification-wrapper-form-actions">
          <button className="main-button">ارسال</button>
        </div>
        <div className="verification-wrapper-form-cancel"></div>
        <Link className="cancel-btn" to="/">
          الغاء
        </Link>
      </div>
    </div>
  );
};

export default VerifitionWrapper;
