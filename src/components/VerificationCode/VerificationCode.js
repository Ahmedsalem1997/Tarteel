import { Link, useNavigate, useParams } from "react-router-dom";
import LoginWrapper from "../LoginWrapper/LoginWrapper";
import Translate from '../../helpers/Translate/Translate';
import { useState } from "react";
import useHTTP from "../../hooks/use-http";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/Auth/Auth";
const VerificationCode = () => {
  const dispatch = useDispatch();
  let { mobile } = useParams();
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  const [input5, setInput5] = useState('');
  const [input6, setInput6] = useState('');
  const { isLoading, error, sendRequest } = useHTTP();
  const [verificationError, setVerificationError] = useState('');
  const navigate = useNavigate();

  const onCodeVerifyHandler = (e) => {
    const code = input1 + input2 + input3 + input4 + input5 + input6;
    e.preventDefault();
    sendRequest({
      url: 'codes/confirm',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        "mobile": mobile,
        "code": code
      }
    }, data => {
      if (data.error) {
        setVerificationError(data.message);
      } else {
        console.log(data);
        setVerificationError('');
        localStorage.setItem('token', data.data.token);
        dispatch(authActions.setAuth(data.data));
        navigate(`/`);
      }
    });
  }
  return (

    <LoginWrapper>
      <form onSubmit={onCodeVerifyHandler}>
        <div className="verification-code-form-header">
          <p><Translate id="verificationCode.sent" /></p>
        </div>
        <div className="verification-code-form-inputs">
          <input type="text" className="trans-input" onChange={(e) => setInput1(e.target.value)} maxLength="1"></input>
          <input type="text" className="trans-input" onChange={(e) => setInput2(e.target.value)} maxLength="1"></input>
          <input type="text" className="trans-input" onChange={(e) => setInput3(e.target.value)} maxLength="1"></input>
          <input type="text" className="trans-input" onChange={(e) => setInput4(e.target.value)} maxLength="1"></input>
          <input type="text" className="trans-input" onChange={(e) => setInput5(e.target.value)} maxLength="1"></input>
          <input type="text" className="trans-input" onChange={(e) => setInput6(e.target.value)} maxLength="1"></input>
        </div>
        {
          verificationError ?
            <div className="verification-code-form-error">
              <p>{verificationError}</p>
            </div>
            :
            ''
        }


        <div className="verification-code-form-actions">
          <button type="submit" className="main-button"><Translate id="button.send" /></button>
        </div>
        <div className="verification-code-form-cancel">
          <Link className="cancel-btn" to="/">
            <Translate id="button.cancel" />
          </Link>
        </div>
      </form>
    </LoginWrapper>
  );
};

export default VerificationCode;
