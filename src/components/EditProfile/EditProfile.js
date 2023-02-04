import BlackBlock from "../BlackBlock/BlackBlock";
import LoginWrapper from "../LoginWrapper/LoginWrapper";

const EditProfile = () => {
    const img = require("../../assets/images/record.jpg");
    return (
        <LoginWrapper>

            <form>
                <div className="edit-profile">
                    <div className="edit-profile-img">
                        <img src={img} alt="..." />
                        <div className="edit-profile-img-upload">تعديل الصورة</div>
                    </div>
                    <div className="edit-profile-input-group">
                        <label>الاسم</label>
                        <input placeholder="الاسم" type="text" className="trans-input" />
                    </div>
                    <div className="edit-profile-input-group">
                        <label>البريد الالكتروني</label>
                        <input placeholder="البريد الالكتروني" type="text" className="trans-input" />
                    </div>
                    <div className="edit-profile-input-group">
                        <label>الجوال</label>
                        <input placeholder="الجوال" type="text" className="trans-input" />
                    </div>
                    <div className="edit-profile-actions">
                        <button type="submit" className="main-button">حفظ</button>
                    </div>

                </div>
            </form>
        </LoginWrapper>
    )
}

export default EditProfile;