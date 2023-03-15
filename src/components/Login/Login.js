import { useState, useEffect } from "react";
import LoginWrapper from "../../components/LoginWrapper/LoginWrapper";
import { useNavigate, useSearchParams } from "react-router-dom";
import useHTTP from "../../hooks/use-http";
import { getAuth, getLongTermToken, setAuth } from "../../utils/Auth";
import Loader from "../Loader/Loader";
import Translate from "../../helpers/Translate/Translate";

const Login = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [code, setCode] = useState(searchParams.get('code'));
    const [uuid, setUuid] = useState(searchParams.get('uuid'));
    const [status, setstatus] = useState(searchParams.get('status'));
    const [message, setMessage] = useState(searchParams.get('message'));
    const [error, setError] = useState(searchParams.get('error'));
    const { isLoading, error: requestError, sendRequest } = useHTTP();
    const navigate = useNavigate();
    useEffect(() => {
        if (status && message && (code || uuid)) {
            if (status === '409') {
                setSuccessMessage('تم تسجيل دخولك بنجاح');
                setErrorMessage('');
            }
            else if (status === '200') {
                // console.log('subscribe')
                setSuccessMessage('تم تسجيلك بنجاح');
                setErrorMessage('');
            } else {
                setSuccessMessage('');
                setErrorMessage(message);
            }
        } else if (code) {
            setSuccessMessage('تم تسجيل دخولك بنجاح');
            setErrorMessage('')
        }
        else {
            setSuccessMessage('');
            setErrorMessage('حدث خطا برجاء اعادة المحاولة');
        }


        // if (status && message) {
        //     // if (code) {
        //     if (status === '409') {
        //         // console.log('login')
        //         setSuccessMessage('تم تسجيل دخولك بنجاح');
        //         setErrorMessage('')
        //     }
        //     else if (status === '200') {
        //         // console.log('subscribe')
        //         setSuccessMessage('تم تسجيلك بنجاح');
        //         setErrorMessage('');
        //     }
        //     fetchUserWithCode(code);
        //     // }
        //     // else {
        //     //     // console.log('1111', error);
        //     //     setErrorMessage(error);
        //     //     setSuccessMessage('');
        //     // }
        // } else if (error) {
        //     // console.log('2222', error);
        //     setErrorMessage(error);
        //     setSuccessMessage('');
        // }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (successMessage) {
            fetchUserWithCode();
        }
    }, [successMessage])

    const fetchUserWithCode = () => {
        let body = {};
        if (code) {
            body = { ...body, authorization_code: code }
        }
        if (uuid) {
            body = { ...body, uuid: uuid }
        }
        console.log(body);
        sendRequest(
            {
                url: 'users/login',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: body

            },
            data => {
                // console.log(data);
                setAuth(data.data);
            },
            err => {
                // console.log('3333', err)
                setErrorMessage('نأسف حدث خطا برجاء المحاولة مرة اخرى');
                setSuccessMessage('');
            }
        )
    }
    return (
        <LoginWrapper>
            {isLoading && <Loader />}
            <div className="login-message">
                {errorMessage && <div className="error-message">
                    <i className="fa-solid fa-triangle-exclamation"></i>
                    <h4>خطأ!</h4>
                    <p>{errorMessage}</p>
                    <button onClick={() => navigate('/home')} className="error-message-cancel-btn w-100"><Translate id="navigation.home" /></button>
                </div>}
                {successMessage && <div className="success-message">
                    <i className="fa-regular fa-square-check"></i>
                    <h4>{successMessage}</h4>
                    <button onClick={() => navigate('/home')} className="success-message-cancel-btn w-100"><Translate id="navigation.home" /></button>
                </div>}
            </div>
        </LoginWrapper>
    );
};
export default Login;
