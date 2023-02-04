// import BlackBlock from "../BlackBlock/BlackBlock";
import { Translate } from "../../helpers/Translate/Translate";
import useTranslate from "../../hooks/use-translate";
import LoginWrapper from "../LoginWrapper/LoginWrapper";

const EditProfile = () => {
    const img = require("../../assets/images/record.jpg");
    return (
        <LoginWrapper>

            <form>
                <div className="edit-profile">
                    <div className="edit-profile-img">
                        <img src={img} alt="..." />
                        <div className="edit-profile-img-upload"><Translate id="button.editImg"/></div>
                    </div>
                    <div className="edit-profile-input-group">
                        <label><Translate id="input.label.name"/></label>
                        <input placeholder={useTranslate('input.placeholder.name')} type="text" className="trans-input" />
                    </div>
                    <div className="edit-profile-input-group">
                        <label><Translate id="input.label.email"/></label>
                        <input placeholder={useTranslate('input.placeholder.email')} type="text" className="trans-input" />
                    </div>
                    <div className="edit-profile-input-group">
                        <label><Translate id="input.label.phone"/></label>
                        <input placeholder={useTranslate('input.placeholder.phone')} type="text" className="trans-input" />
                    </div>
                    <div className="edit-profile-actions">
                        <button type="submit" className="main-button"><Translate id="button.save"/></button>
                    </div>

                </div>
            </form>
        </LoginWrapper>
    )
}

export default EditProfile;