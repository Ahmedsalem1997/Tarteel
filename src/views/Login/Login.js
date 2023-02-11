// import LoginWrapper from "../../components/LoginWrapper/LoginWrapper";
import { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import LoginWrapper from "../../components/LoginWrapper/LoginWrapper";
import useHTTP from "../../hooks/use-http";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { isLoading, error, sendRequest } = useHTTP();
  const [mobileError, setMobileError] = useState('');
  const navigate = useNavigate();
  const onLoginHandler = (e) => {
    e.preventDefault();
    if(mobileNumber.trim().length !== 12) {
      setErrorMessage('Phone Number Must be 12 Character');
      return
    }
    sendRequest({
      url: 'codes/get',
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: {
        "mobile": Number(mobileNumber),
        "operator_id": 1
      }
    }, data => {
      if (data.error) {
        setMobileError(data.message);
      } else {
        setMobileError('');
        navigate(`/verification-code/${mobileNumber}`);
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
            <input className="trans-input" type='number' onChange={mobileNumberChangeHandler} required></input>
            <p>{mobileError}</p>
            <p>{errorMessage}</p>
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
