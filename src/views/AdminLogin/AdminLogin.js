import { useState } from "react";
import Joi from "joi";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import LoginWrapper from "../../components/LoginWrapper/LoginWrapper";
import useHTTP from "../../hooks/use-http";
import Translate from "../../helpers/Translate//Translate";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import useTranslate from "../../hooks/use-translate";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");

  const { isLoading } = useHTTP();

  const onLoginHandler = (e) => {
    e.preventDefault();
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
    e.preventDefault();
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
export default Login;
