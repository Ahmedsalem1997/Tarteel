import { useDispatch } from "react-redux";
import Translate from "../../helpers/Translate/Translate";
import useHTTP from "../../hooks/use-http";
import { modalsActions } from "../../store/Modals/Modals";
import { getAuth, setAuth, setLongTermToken } from "../../utils/Auth";
import Modal from "../Modal/Modal";
import Loader from "../Loader/Loader";
import { useState } from "react";



const NotRegistered = () => {
  const dispatch = useDispatch();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const closeLoginModal = () => {
    dispatch(modalsActions.closeLoginModal());
  };
  const { isLoading, error, sendRequest } = useHTTP();
  const [err, setErr] = useState('');
  const { isAuth, isSubscribed, loggedUser } = getAuth();
  const [showSubscriptionType, setShowSubscriptionType] = useState(false);
  const [selectedSubscriptionType, setSelectedSubscriptionType] = useState('daily');
  const [showTelInput, setShowTelInput] = useState(false);
  const [loginTel, setLoginTel] = useState('');
  const onLogin = () => {
    setIsRedirecting(true);
    sendRequest(
      {
        url: "users/login",
        method: "GET"
      },
      data => {
        // console.log(data);
        window.location.replace(data.data);
      },
      err => {
        setErr(err);
        setIsRedirecting(false);
      }
    )
  }
  const onRegister = () => {
    const operator = process.env.REACT_APP_OPERATOR_ID;

    if (operator.startsWith('Zain')) {
      setShowSubscriptionType(true);
    } else {
      handleRegister();
    }
    // handleRegister();
  }

  const handleRegister = (subType) => {
    setIsRedirecting(true);
    const url = subType === 'monthly' ? 'subscribe?sub_type=monthly' : 'subscribe'
    sendRequest(
      {
        url: url,
        method: "POST",
        // headers: subType === 'monthly' ? { "sub_type": "monthly" } : {},
        // body: {
        //   long_term_token: setLongTermToken()
        // },
      },
      (data) => {
        // console.log(data);
        // setTimeout(() => {
        window.location.replace(data.data);
        // }, 20000);
      },
      err => {
        setErr(err);
        setIsRedirecting(false);
      }
    );
  }

  const onZainLogin = (e) => {
    e.preventDefault();
    if (loginTel)
      sendRequest(
        {
          url: 'users/temp/login',
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: {
            authorization_code: 'zain_code',
            mobile: loginTel
          },
        },
        (data) => {
          console.log(data);
          setAuth(data.data);
          closeLoginModal();
          window.location.reload();
        },
        err => {
          setErr(err);
        }
      );
  }
  return (
    <Modal>
      {(isLoading || isRedirecting) && <Loader />}
      {
        (isSubscribed && !isAuth) &&
        <div className="not-registered">
          <div className="not-registered-header">
            <h3><Translate id="notRegistered.noCredit" /></h3>
          </div>
          <div className="not-registered-cancel">
            <button className="cancel-btn" onClick={closeLoginModal}><Translate id="button.cancel" /></button>
          </div>
        </div>
      }
      {
        !isSubscribed &&
        < div className="not-registered">
          <div className="not-registered-header">
            <h3><Translate id="notRegistered.title" /></h3>
            <p><Translate id="notRegistered.pleaseRegister" /></p>
          </div>
          <div className="not-registered-actions">
            <button className="main-button" onClick={() => setShowTelInput(!showTelInput)}><Translate id="button.login" /></button>
            {
              showTelInput &&
              <form className="zain-login" onSubmit={onZainLogin}>
                <div className="zain-login-input">
                  <input value={loginTel} placeholder="05XXXXXXXX" type="tel" pattern="05[0-9]{8}" onChange={(e) => setLoginTel(e.target.value)} />
                </div>
                <button
                  // onClick={() => onZainLogin()}
                  className="trans-btn"><Translate id="button.login" /></button>
              </form>
            }
            <button className="trans-btn" onClick={onRegister}><Translate id="button.register" /></button>
            {showSubscriptionType && <div className="subscriptionTypeWrapper">
              <div className={`subscriptionType ${selectedSubscriptionType === 'daily' ? 'selected' : ''}`} onClick={() => setSelectedSubscriptionType('daily')}>
                <input type="radio" id="daily" name="subType" value={'daily'} checked={selectedSubscriptionType === 'daily'} />
                <label htmlFor="daily"><Translate id="notRegistered.daily" /> 2 <Translate id="notRegistered.SAR" /></label>
              </div>
              <div className={`subscriptionType ${selectedSubscriptionType === 'monthly' ? 'selected' : ''}`} onClick={() => setSelectedSubscriptionType('monthly')}>
                <input type="radio" id="monthly" name="subType" value={'monthly'} checked={selectedSubscriptionType === 'monthly'} />
                <label htmlFor="monthly"><Translate id="notRegistered.monthly" /> 30 <Translate id="notRegistered.SAR" /></label>
              </div>
              <button
                onClick={() => handleRegister(selectedSubscriptionType)}
                className="main-button"><Translate id="notRegistered.subscribe" /></button>
            </div>}
          </div>
          <div className="not-registered-cancel">
            <button className="cancel-btn" onClick={closeLoginModal}><Translate id="button.cancel" /></button>
          </div>
        </div>
      }

    </Modal >
  );
};

export default NotRegistered;
