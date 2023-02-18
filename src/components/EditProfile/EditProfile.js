import Joi from 'joi';
import { useEffect, useState } from "react";
import { Translate } from "../../helpers/Translate/Translate";
import useHTTP from "../../hooks/use-http";
import useTranslate from "../../hooks/use-translate";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth, setAuth } from "../../utils/Auth";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Modal from "../Modal/Modal";
import { modalsActions } from "../../store/Modals/Modals";
import Loader from "../Loader/Loader";
import { authActions } from "../../store/Auth/Auth";
// import { URLSearchParams } from "url";

const EditProfile = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const img = require("../../assets/images/record.jpg");
    const { isLoading, error, sendRequest } = useHTTP();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState(img);
    const [newAvatar, setNewAvatar] = useState(img);
    const [token, setToken] = useState('');
    const [nameErr, setNameErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const auth = getAuth();
    // const loadXHR = (url) => {
    //     return new Promise(function (resolve, reject) {
    //         try {
    //             var xhr = new XMLHttpRequest();
    //             xhr.open("GET", url);
    //             xhr.responseType = "blob";
    //             xhr.onerror = function () { reject("Network error.") };
    //             xhr.onload = function () {
    //                 if (xhr.status === 200) { resolve(xhr.response) }
    //                 else { reject("Loading error:" + xhr.statusText) }
    //             };
    //             xhr.send();
    //         }
    //         catch (err) { reject(err.message) }
    //     });
    // }
    useEffect(() => {
        if (auth.user.name && auth.user.email) {
            setName(auth.user.name);
            setEmail(auth.user.email);
            setAvatar(auth.user.avatar);
            setNewAvatar(auth.user.avatar);
        }
        setToken(auth.token);
    }, []);
    const onEditProfileHandler = (e) => {
        e.preventDefault();
        if (name && email) {
            let formdata = new FormData();
            formdata.append('name', name);
            formdata.append('email', email);
            if (avatar !== newAvatar) {
                formdata.append('avatar', avatar);
            }
            sendRequest(
                {
                    url: 'profile',
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formdata
                },
                data => {
                    setAuth({ user: data.data });
                    dispatch(modalsActions.closeEditProfileModal(data.data));
                    dispatch(authActions.setAuth({ user: data.data }));
                    if (location.pathname.includes('/verification-code/')) {
                        navigate(`/`);
                    }
                },
                err => {

                }
            );
        }
    }

    const onAvatarChange = (e) => {
        if (!e?.target?.files[0]) return;

        const FR = new FileReader();
        FR.addEventListener("load", function (evt) {
            console.log('converted img ....', evt.target.result);
            setNewAvatar(evt.target.result);
        });
        FR.readAsDataURL(e.target.files[0]);

        let file = e.target.files[0];
        setAvatar(file);
    }

    const onChangeName = (e) => {
        const schema = Joi.object({
            name: Joi.string().pattern(/^[a-zA-Z\u0621-\u064A ]{3,30}$/).required()
        })
        const nameError = schema.validate({ name: e.target.value });
        if (nameError.error) {
            setNameErr('name');
        } else {
            setNameErr('');
        }
        setName(e.target.value);
    }

    const onChangeEmail = (e) => {
        const schema = Joi.object({
            email: Joi.string().email({ tlds: false }).required()
        })
        const nameError = schema.validate({ email: e.target.value });
        if (nameError.error) {
            console.log(nameError.error);
            setEmailErr('email');
        } else {
            setEmailErr('');
        }
        setEmail(e.target.value);
    }

    return (
        <Modal>
            {isLoading && <Loader />}
            <form onSubmit={onEditProfileHandler}>
                <div className="edit-profile">
                    <div className="edit-profile-img">
                        <img src={newAvatar} alt="..." />
                        <div className="edit-profile-img-upload" onClick={() => document.getElementById('upload-img').click()}><Translate id="button.editImg" /></div>
                        <input accept="image/*" value={''} onChange={onAvatarChange} type='file' id="upload-img" />
                    </div>
                    <div className="edit-profile-input-group">
                        <label><Translate id="input.label.name" /></label>
                        <input name="name" placeholder={useTranslate('input.placeholder.name')} value={name} onChange={onChangeName} type="text" className="trans-input" required />
                        <ErrorMessage message={nameErr} />
                    </div>
                    <div className="edit-profile-input-group">
                        <label><Translate id="input.label.email" /></label>
                        <input name="email" placeholder={useTranslate('input.placeholder.email')} value={email} onChange={onChangeEmail} type="text" className="trans-input" required />
                        <ErrorMessage message={emailErr} />
                    </div>
                    <div className="edit-profile-actions">
                        <button type="submit" className="main-button" disabled={emailErr || nameErr}><Translate id="button.save" /></button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}

export default EditProfile;