import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Translate from "../../helpers/Translate//Translate";
import { modalsActions } from "../../store/Modals/Modals";
import Modal from "../Modal/Modal";


const NotRegistered = () => {
  const dispatch = useDispatch();
  const closeLoginModal = () => {
    dispatch(modalsActions.closeLoginModal());
  }
  return (
    <Modal>
      <div className="not-registered-header">
        <h3><Translate id="notRegistered.title" /></h3>
        <p><Translate id="notRegistered.pleaseRegister" /></p>
      </div>
      <div className="not-registered-actions">
        <Link to="/login"><button className="main-button"><Translate id="button.login" /></button></Link>
        <Link to="/login"><button className="trans-btn"><Translate id="button.register" /></button></Link>
      </div>
      <div className="not-registered-cancel">
        <button className="cancel-btn" onClick={closeLoginModal}><Translate id="button.cancel" /></button>
      </div>
    </Modal>
  );
};

export default NotRegistered;
