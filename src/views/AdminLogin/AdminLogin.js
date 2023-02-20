import { useState } from "react";
import Joi from "joi";
import Loader from "../../components/Loader/Loader";
import LoginWrapper from "../../components/LoginWrapper/LoginWrapper";
import useHTTP from "../../hooks/use-http";
import Translate from "../../helpers/Translate//Translate";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import useTranslate from "../../hooks/use-translate";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [emailError, setEmailError] = useState("");

  const { isLoading, error, sendRequest } = useHTTP();

  const onLoginHandler = (e) => {
    e.preventDefault();
    sendRequest(
      {
        url: "codes/get",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          email: email,
          password: password,
        },
      },
      (data) => {
        if (data.error) {
          emailError(data.message);
        } else {
          setEmailError("");
        }
      },
      (err) => {}
    );
};

  const onChangeEmail = (e) => {
    const schema = Joi.object({
      email: Joi.string()
        .email({ tlds: false, allowUnicode: false })
        .required(),
    });
    const nameError = schema.validate({ email: e.target.value });
    if (nameError.error) {
      setEmailErr("email");
    } else {
      setEmailErr("");
    }
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    const schema = Joi.object({
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    });
    const nameError = schema.validate({ password: e.target.value });
    if (nameError.error) {
      setPasswordErr("password");
    } else {
      setPasswordErr("");
    }
    setPassword(e.target.value);
  };

  return (
    <LoginWrapper>
      {isLoading && <Loader />}
      <form className="admin-login" onSubmit={onLoginHandler}>
        <div className="login-form-header">
          <p>
            <Translate id="login.adminLogin" />
          </p>
        </div>
        <div className="admin-login-form-content">
          <div className="login-form-content-input-group">
            <label>
              <Translate id="input.label.email" />
            </label>
            <input
              name="email"
              placeholder={useTranslate("input.placeholder.email")}
              value={email}
              onChange={onChangeEmail}
              type="text"
              className="trans-input"
              required
            />
            <ErrorMessage message={emailErr} />
          </div>
          <div className="login-form-content-input-group">
            <label>
              <Translate id="input.label.password" />
            </label>
            <input
              name="password"
              placeholder={useTranslate("input.placeholder.password")}
              value={password}
              onChange={onChangePassword}
              type="password"
              className="trans-input"
              required
            />
            <ErrorMessage message={passwordErr} />
          </div>
        </div>
        <div className="login-form-actions">
          <button type="submit" className="main-button">
            <Translate id="button.login" />
          </button>
        </div>
      </form>
    </LoginWrapper>
  );
};
export default AdminLogin;
