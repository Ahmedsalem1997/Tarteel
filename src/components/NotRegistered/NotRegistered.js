import { Link } from "react-router-dom";
const NotRegistered = () => {
  return (
    <div className="not-registered">
      <div className="not-registered-header">
        <h3>أنت غير مسجل الدخول</h3>
        <p>الرجاء تسجيل الدخول لتتمكن من الاستمتاع بهذا المحتوي</p>
      </div>
      <div className="not-registered-actions">
        <button className="main-button">تسجيل الدخول</button>
        <button className="listen-btn">تسجيل جديد</button>
      </div>
      <div className="not-registered-cancel"></div>
      <Link className="cancel-btn" to="/">الغاء</Link>
    </div>
  );
};

export default NotRegistered;
