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
    const [nameErrorMessage, setNameErrorMessage] = useState("");
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    let emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
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
        // if (!auth.isAuth && props.token) {
        //     // setName(props.user.name);
        //     // setEmail(props.user.email);
        //     // setAvatar(props.user.avatar);
        //     setToken(props.token);
        // } else if (auth.isAuth) {
        if (auth.user.name && auth.user.email) {
            setName(auth.user.name);
            setEmail(auth.user.email);
            setAvatar(auth.user.avatar);
            setNewAvatar(auth.user.avatar);
        }
        setToken(auth.token);
        // }
    }, []);
    const onEditProfileHandler = (e) => {
        e.preventDefault();
        if (!name) {
            setNameErr('name is required');
        }
        if (!email) {
            setEmailErr('Email is required');
        }
        if (name.trim().length < 5) {
            setNameErrorMessage("name")
            return;
        }
        if (!email || emailRegex.test(email) === false) {
            setEmailErrorMessage('email')
            return;
        }
        setEmailErrorMessage("email");
        if (name && email) {
            console.log('tokeeeeen45678', token);
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
                    dispatch(modalsActions.closeEditProfileModal());
                    if (location.pathname.includes('/verification-code/')) {
                        // setAuth({ token: token })
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
        setName(e.target.value);
    }

    const onChangeEmail = (e) => {
        if (email || emailRegex.test(email) === true) {
            setEmailErrorMessage("email")
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
                        <input placeholder={useTranslate('input.placeholder.name')} value={name} onChange={onChangeName} type="text" className="trans-input" required />
                        {/* {error?.includes('name') ? <div className="text-danger fs-5">{error}</div> : ''} */}
                        <ErrorMessage message={nameErrorMessage} />
                    </div>
                    <div className="edit-profile-input-group">
                        <label><Translate id="input.label.email" /></label>
                        <input placeholder={useTranslate('input.placeholder.email')} value={email} onChange={onChangeEmail} type="text" className="trans-input" required />
                        {/* {error?.includes('email') ? <div className="text-danger fs-5">{error}</div> : ''} */}
                        <ErrorMessage message={emailErrorMessage} />
                    </div>
                    <div className="edit-profile-actions">
                        <button type="submit" className="main-button"><Translate id="button.save" /></button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}

export default EditProfile;