import { useState } from "react";


const Login = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('')


    return (
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
    );
};
export default Login;
