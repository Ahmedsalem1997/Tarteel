// import LoginWrapper from "../../components/LoginWrapper/LoginWrapper";
import { Link } from "react-router-dom";
import LoginWrapper from "../../components/LoginWrapper/LoginWrapper";

const Login = () => {
  return (
    <LoginWrapper>
      <div className="login-form-header">
        <p>التحقق من رقم الهاتف</p>
      </div>
      <div className="login-form-content">
        <div className="login-form-content-input-group">
          <label className="login-form-content-label">رقم الهاتف</label>
          <input className="trans-input"></input>
        </div>
      </div>
      <div className="login-form-header">
        <p>من أجل التحقق من صحة رقم هاتفك</p>
        <p>سنرسل رمز التحقق يجب إدخاله في الصفحة التالية</p>
      </div>
      <div className="login-form-actions">
        <button className="main-button">الحصول علي الرمز</button>
      </div>
      <div className="login-form-cancel">
        <Link className="cancel-btn" to="/">
          الغاء
        </Link>
      </div>
    </LoginWrapper>

  );
};
export default Login;
