import { Link, useNavigate, useParams } from "react-router-dom";
import LoginWrapper from "../LoginWrapper/LoginWrapper";
import EditProfile from "../EditProfile/EditProfile";
import Translate from "../../helpers/Translate/Translate";
import OTPInput from "otp-input-react";
import { useState } from "react";
import useHTTP from "../../hooks/use-http";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/Auth/Auth";
import Modal from "../Modal/Modal";
const VerificationCode = () => {
  const dispatch = useDispatch();
  let { mobile } = useParams();
  // const [input1, setInput1] = useState("");
  // const [input2, setInput2] = useState("");
  // const [input3, setInput3] = useState("");
  // const [input4, setInput4] = useState("");
  // const [input5, setInput5] = useState("");
  // const [input6, setInput6] = useState("");
  const [OTP, setOTP] = useState("");
  const { sendRequest } = useHTTP();
  const [verificationError, setVerificationError] = useState("");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({});
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
          if (
            data.data.user.name &&
            data.data.user.email &&
            data.data.user.avatar
          ) {
            localStorage.setItem("token", data.data.token);
            localStorage.setItem("user", JSON.stringify(data.data.user));
            dispatch(authActions.setAuth(data.data));
            navigate(`/`);
          } else {
            setUser(data.data.user);
            setToken(data.data.token);
            setIsOpen(true);
          }
        }
      }
    );
  };

  return (
    <LoginWrapper>
      <form onSubmit={onCodeVerifyHandler}>
        <div className="verification-code-form-header">
          <p>
            <Translate id="verificationCode.sent" />
          </p>
        </div>
        {/* <div className="verification-code-form-inputs">
          <input
            type="text"
            className="trans-input"
            onChange={(e) => setInput1(e.target.value)}
            maxLength="1"
          ></input>
          <input
            type="text"
            className="trans-input"
            onChange={(e) => setInput2(e.target.value)}
            maxLength="1"
          ></input>
          <input
            type="text"
            className="trans-input"
            onChange={(e) => setInput3(e.target.value)}
            maxLength="1"
          ></input>
          <input
            type="text"
            className="trans-input"
            onChange={(e) => setInput4(e.target.value)}
            maxLength="1"
          ></input>
          <input
            type="text"
            className="trans-input"
            onChange={(e) => setInput5(e.target.value)}
            maxLength="1"
          ></input>
          <input
            type="text"
            className="trans-input"
            onChange={(e) => setInput6(e.target.value)}
            maxLength="1"
          ></input>
        </div> */}
        <div className="verification-code-form-inputs">
          <OTPInput
            onChange={handleOTPChange}
            value={OTP}
            autoFocus
            otpType="number"
            OTPLength={6}
            inputClassName="trans-input"
            style={{columnGap: '1rem'}}
            inputStyles={{width: '16.666%', marginRight: '0', height: '3rem'}}
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
      {isOpen && (
        <Modal>
          <EditProfile token={token} user={user} setIsOpen={setIsOpen} />
        </Modal>
      )}
    </LoginWrapper>
  );
};

export default VerificationCode;
