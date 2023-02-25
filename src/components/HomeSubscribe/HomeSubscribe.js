import { useState } from 'react';
import Translate from '../../helpers/Translate/Translate';
import useHTTP from '../../hooks/use-http';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { setLongTermToken } from "../../utils/Auth";

const HomeSubscribe = () => {
    const [mobileNumber, setMobileNumber] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { isLoading, error, sendRequest } = useHTTP();

    const mobileNumberChangeHandler = (e) => {
        if (e.target.value.trim().length !== 12) {
            setErrorMessage("mobileNumberMessage");
            // return;
        } else {
            setErrorMessage("");
        }
        // if (e.target.value.trim().length === 12) {
        // }
        setMobileNumber(e.target.value);
    };

    const onLogin = () => {
        if (mobileNumber.trim().length === 12) {
            sendRequest(
                {
                    url: "subscribe",
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: {
                        long_term_token: setLongTermToken(),
                        operator_id: 1
                    },
                },
                (data) => {
                    // console.log(data);
                    window.location.replace(data.data);
                },
                err => {

                }
            );
        } else {
            setErrorMessage("mobileNumberMessage");
        }

    }
    return (
        <div className="home-subscribe">
            <p className="home-subscribe-text"><Translate id="subscribeSection.title" /></p>
            <div className="home-subscribe-input-group">
                <input value={mobileNumber} className="home-subscribe-input" onChange={mobileNumberChangeHandler} type="number" />
                <button disabled={errorMessage} className="home-subscribe-send-btn" onClick={onLogin}><Translate id="button.send" /></button>
            </div>
            <ErrorMessage message={errorMessage} />
        </div>
    )
}

export default HomeSubscribe;