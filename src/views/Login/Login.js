// import LoginWrapper from "../../components/LoginWrapper/LoginWrapper";
import { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import LoginWrapper from "../../components/LoginWrapper/LoginWrapper";
import useHTTP from "../../hooks/use-http";

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState('')
  const { isLoading, error, sendRequest } = useHTTP();
  const [mobileError, setMobileError] = useState('');
  const onLoginHandler = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('mobile', mobileNumber);
    sendRequest({
      url: 'codes/get',
      method: 'POST',
      body: {
        "mobile": mobileNumber
      }
    }, data => {
      if (data.error) {
        setMobileError(data.message);
      }
    });
  }
  const mobileNumberChangeHandler = (e) => {
    setMobileNumber(e.target.value);
  }

  return (
    <LoginWrapper>
      <form onSubmit={onLoginHandler}>
        <div className="login-form-header">
          <p>التحقق من رقم الهاتف</p>
          {isLoading ? <Loader /> : ''}
        </div>
        <div className="login-form-content">
          <div className="login-form-content-input-group">
            <label className="login-form-content-label">رقم الهاتف</label>
            <input className="trans-input" onChange={mobileNumberChangeHandler}></input>
            <p>{mobileError}</p>
          </div>
        </div>
        <div className="login-form-header">
          <p>من أجل التحقق من صحة رقم هاتفك</p>
          <p>سنرسل رمز التحقق يجب إدخاله في الصفحة التالية</p>
        </div>
        <div className="login-form-actions">
          <button type="submit" className="main-button">الحصول علي الرمز</button>
        </div>
        <div className="login-form-cancel">
          <Link className="cancel-btn" to="/">
            الغاء
          </Link>
        </div>
      </form>
    </LoginWrapper>

  );
};
export default Login;
