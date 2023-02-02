// import LoginWrapper from "../../components/LoginWrapper/LoginWrapper";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-wrapper">
      <div className="not-registered">
        <div className="not-registered-header">
          <p>التحقق من رقم الهاتف</p>
        </div>
        <div className="not-registered-content">
          <div className="not-registered-content-input-group">
            <label className="not-registered-content-label">رقم الهاتف</label>
            <input className="not-registered-content-input"></input>
          </div>
        </div>
        <div className="not-registered-header">
          <p>من أجل التحقق من صحة رقم هاتفك</p>
          <p>سنرسل رمز التحقق يجب إدخاله في الصفحة التالية</p>
        </div>
        <div className="not-registered-actions">
          <button className="main-button">الحصول علي الرمز</button>
        </div>
        <div className="not-registered-cancel"></div>
        <Link className="cancel-btn" to="/">
          الغاء
        </Link>
      </div>
    </div>
  );
};
export default Login;
