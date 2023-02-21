import { useState } from "react";
import LoginWrapper from "../../components/LoginWrapper/LoginWrapper";


const Login = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('')


    return (
        <LoginWrapper>

            <div className="login-message">
                <div className="error-message">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    <h4>Oh snap!</h4>
                    <p>An error has occured while creating an error report</p>
                    <p className="error-message-cancel-btn">Dismiss</p>
                </div>
                <div className="success-message">
                    <i class="fa-regular fa-square-check"></i>
                    <h4>Success</h4>
                    <p className="success-message-cancel-btn">Dismiss</p>
                </div>
            </div>
        </LoginWrapper>
    );
};
export default Login;
