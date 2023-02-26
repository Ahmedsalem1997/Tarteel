import Translate from "../../helpers/Translate/Translate";

const ErrorMessage = ({ message }) => {
    if (message) {
        return (
            <div className="err-message">
                <p>
                    <Translate id={message ? `error.${message}` : ''} />
                </p>
            </div>
        );
    } else {
        return;
    }
}

export default ErrorMessage;