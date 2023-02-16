import { Link, useNavigate, useParams } from "react-router-dom";
import LoginWrapper from "../LoginWrapper/LoginWrapper";
import Translate from "../../helpers/Translate/Translate";
import OTPInput from "otp-input-react";
import { useState } from "react";
import useHTTP from "../../hooks/use-http";
import { setAuth } from "../../utils/Auth";
import { useDispatch } from "react-redux";
import { modalsActions } from "../../store/Modals/Modals";
const VerificationCode = () => {
  let { mobile } = useParams();
  const [OTP, setOTP] = useState("");
  const { sendRequest } = useHTTP();
  const [verificationError, setVerificationError] = useState("");
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  const handleOTPChange = (OTP) => {
    console.log(OTP);
    setOTP(OTP);
  };

  const onCodeVerifyHandler = (e) => {
    e.preventDefault();
    console.log(OTP);
    sendRequest(
      {
        url: "codes/confirm",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          mobile: mobile,
          code: OTP,
        },
      },
      (data) => {
        if (data.error) {
          setVerificationError(data.message);
        } else {
          setVerificationError("");
          setAuth(data.data);
          if (
            data.data.user.name &&
            data.data.user.email
          ) {
            console.log('user exist and login');
            navigate(`/`);
          } else {
            console.log('user not exist and register');
            openEditProfileModal();
          }
        }
      }
    );
  };

  const dispatch = useDispatch();
  const openEditProfileModal = () => {
    dispatch(modalsActions.openEditProfileModal(token));
  }
  return (
    <LoginWrapper>
      <form onSubmit={onCodeVerifyHandler}>
        <div className="verification-code-form-header">
          <p>
            <Translate id="verificationCode.sent" />
          </p>
        </div>
        <div className="verification-code-form-inputs">
          <OTPInput
            onChange={handleOTPChange}
            value={OTP}
            autoFocus
            otpType="number"
            OTPLength={6}
            inputClassName="trans-input"
            style={{ columnGap: '1rem' }}
            inputStyles={{ width: '16.666%', marginRight: '0', height: '3rem' }}
            disabled={false}
          />
        </div>
        {verificationError && (
          <div className="verification-code-form-error">
            <p>{verificationError}</p>
          </div>
        )}

        <div className="verification-code-form-actions">
          <button type="submit" className="main-button">
            <Translate id="button.send" />
          </button>
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
