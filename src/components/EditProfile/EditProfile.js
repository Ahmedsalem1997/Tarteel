import { useEffect, useState } from "react";
import { Translate } from "../../helpers/Translate/Translate";
import useHTTP from "../../hooks/use-http";
import useTranslate from "../../hooks/use-translate";
import BlackBlock from "../BlackBlock/BlackBlock";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/Auth/Auth";
import { useNavigate } from "react-router-dom";
// import { URLSearchParams } from "url";

const EditProfile = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const img = require("../../assets/images/record.jpg");
    const { isLoading, error, sendRequest } = useHTTP();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState(undefined);
    const [token, setToken] = useState('');
    const auth = useSelector(state => {
        return { isAuth: state.auth.isAuth, user: state.auth.user, token: state.auth.token };
    });
    useEffect(() => {
        if (!auth.isAuth && props.user && props.token) {
            setName(props.user.name);
            setEmail(props.user.email);
            setAvatar(props.user.avatar);
            setToken(props.token);
        } else if (auth.isAuth) {
            setName(auth.user.name);
            setEmail(auth.user.email);
            setAvatar(auth.user.avatar);
            setToken(auth.token);
        }
    }, []);
    const onEditProfileHandler = (e) => {
        e.preventDefault();
        let body = { name, email, avatar };
        let formdata = new FormData();
        if (avatar) {
            formdata.append('name', name);
            formdata.append('email', email);
            formdata.append('avatar', avatar);
            // { name, email, avatar: avatar.slice().slice() };
            // body = new URLSearchParams(formdata);
        }
        
        sendRequest({
            url: 'profile',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formdata
        },
            data => {
                localStorage.setItem('user', JSON.stringify(data.data));
                dispatch(authActions.setAuth({ token, user: data.data }));
                props.setIsOpen(false);
                if (props.token) {
                    localStorage.setItem('token', token);
                    navigate(`/`);
                }
            });
    }

    const onAvatarChange = (e) => {
        let file = e.target.files[0];
        setAvatar(file);
    }
    return (
        <BlackBlock width="80%">
            <form onSubmit={onEditProfileHandler}>
                <div className="edit-profile">
                    <div className="edit-profile-img">
                        <img src={auth.user.avatar} alt="..." />
                        <div className="edit-profile-img-upload" onClick={() => document.getElementById('upload-img').click()}><Translate id="button.editImg" /></div>
                        <input onChange={onAvatarChange} type='file' id="upload-img" />
                    </div>
                    <div className="edit-profile-input-group">
                        <label><Translate id="input.label.name" /></label>
                        <input placeholder={useTranslate('input.placeholder.name')} value={name} onChange={(e) => setName(e.target.value)} type="text" className="trans-input" required />
                    </div>
                    <div className="edit-profile-input-group">
                        <label><Translate id="input.label.email" /></label>
                        <input placeholder={useTranslate('input.placeholder.email')} value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="trans-input" required />
                    </div>
                    {/* <div className="edit-profile-input-group">
                        <label><Translate id="input.label.phone" /></label>
                        <input placeholder={useTranslate('input.placeholder.phone')} value={phone} type="text" className="trans-input" required />
                    </div> */}
                    <div className="edit-profile-actions">
                        <button type="submit" className="main-button"><Translate id="button.save" /></button>
                    </div>

                </div>
            </form>
        </BlackBlock>
    )
}

export default EditProfile;