import { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import LoginWrapper from "../../components/LoginWrapper/LoginWrapper";
import useHTTP from "../../hooks/use-http";
import Translate from "../../helpers/Translate//Translate";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
const SubscriptionLogin = () => {
    const [mobileNumber, setMobileNumber] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { isLoading, error, sendRequest } = useHTTP();
    const [mobileError, setMobileError] = useState("");
    const onLoginHandler = (e) => {
        e.preventDefault();
        if (mobileNumber.trim().length !== 12) {
            setErrorMessage("mobileNumberMessage");
            return;
        }
        sendRequest(
            {
                url: "subscribe",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: {
                    mobile: Number(mobileNumber.trim()),
                    operator_id: 1,
                },
            },
            (data) => {
                // console.log(data);
                if (data.error) {
                    setMobileError(data.message);
                } else {
                    setMobileError("");
                    window.location.replace(data.data);
                }
            },
            err => {

            }
        );
    };
    const mobileNumberChangeHandler = (e) => {
        if (e.target.value.trim().length > 12) {
            setErrorMessage("mobileNumberMessage");
            return;
        }
        if (e.target.value.trim().length === 12) {
            setErrorMessage("");
        }
        setMobileNumber(e.target.value);
    };
    return (
        <LoginWrapper>
            {isLoading && <Loader />}
            <form onSubmit={onLoginHandler}>
                <div className="login-form-header">
                    <p>
                        <Translate id="login.validNumber" />
                    </p>
                </div>
                <div className="login-form-content">
                    <div className="login-form-content-input-group">
                        <label className="login-form-content-label">
                            <Translate id="login.mobileNumber" />
                        </label>
                        <input
                            className="trans-input"
                            type="number"
                            onChange={mobileNumberChangeHandler}
                            required
                        ></input>
                    </div>
                </div>
                <ErrorMessage message={errorMessage} />
                <div className="login-form-header">
                    <p>
                        <Translate id="login.validTrueNumber" />
                    </p>
                    <p>
                        <Translate id="login.sendVerificationCode" />
                    </p>
                </div>
                <div className="login-form-actions">
                    <button type="submit" className="main-button">
                        <Translate id="button.getCode" />
                    </button>
                </div>
                <div className="login-form-cancel">
                    <Link className="cancel-btn" to="/">
                        <Translate id="button.cancel" />{" "}
                    </Link>
                </div>
            </form>
        </LoginWrapper>
    )
}

export default SubscriptionLogin;   