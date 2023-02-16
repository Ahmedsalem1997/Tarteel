import Translate from "../../helpers/Translate//Translate";

const ErrorMessage = ({ message }) => {
    return (
        <div className="error-message">
            <p>
                <Translate id={message ? `error.${message}`:''} />
            </p>
        </div>
    );
}

export default ErrorMessage;