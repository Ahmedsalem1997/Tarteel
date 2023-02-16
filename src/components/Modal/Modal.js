import { Fragment } from "react"
import * as ReactDOM from 'react-dom';

const Backdrop = props => {
    return <div className="backdrop" />
}

const ModalOverlay = props => {
    return (
        <div className="modal">
            <div className="content">
                {props.showClose && <span className="modal-dismiss" onClick={() => props.onClose()}>X</span>}
                {props.children}
            </div>
        </div>
    )
}
const portalElement = document.getElementById('overlay');
const Modal = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop />, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay showClose={props.showClose} onClose={props.onClose}>{props.children}</ModalOverlay>, portalElement)}
        </Fragment>
    )
}

export default Modal;