import { Link } from "react-router-dom";
import LoginWrapper from "../LoginWrapper/LoginWrapper";
const NotRegistered = () => {
  return (
    <LoginWrapper>
      <div className="not-registered-header">
        <h3>أنت غير مسجل الدخول</h3>
        <p>الرجاء تسجيل الدخول لتتمكن من الاستمتاع بهذا المحتوي</p>
      </div>
      <div className="not-registered-actions">
        <button className="main-button">تسجيل الدخول</button>
        <button className="trans-btn">تسجيل جديد</button>
      </div>
      <div className="not-registered-cancel">
        <Link className="cancel-btn" to="/">الغاء</Link>
      </div>
    </LoginWrapper>
  );
};

export default NotRegistered;
