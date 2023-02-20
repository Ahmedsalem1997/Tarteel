import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import AddNewRecord from "../../components/AddNewRecord/AddNewRecord";
import EditProfile from "../../components/EditProfile/EditProfile";
import MediaPlayer from "../../components/MediaPlayer/MediaPlayer";
import NotRegistered from "../../components/NotRegistered/NotRegistered";
import useHTTP from "../../hooks/use-http";
import { modalsActions } from "../../store/Modals/Modals";
import { getAuth, getLongTermToken, setAuth, setLongTermToken } from "../../utils/Auth";

const BasicLayout = () => {
    const modals = useSelector(state => state.modals);
    const [searchParams, setSearchParams] = useSearchParams();
    const [code, setCode] = useState(searchParams.get('code'));
    const [status, setstatus] = useState(searchParams.get('status'));
    const [message, setMessage] = useState(searchParams.get('message'));
    const [error, setError] = useState(searchParams.get('error'));
    const { isLoading, error: requestError, sendRequest } = useHTTP();
    const auth = getAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchUser = (code) => {
        sendRequest(
            {
                url: 'codes',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: {
                    authorization_code: code,
                    long_term_token: getLongTermToken(),
                    operator_id: 1
                }

            },
            data => {
                console.log(data);
                setAuth(data.data);
                if (
                    data.data.user.name &&
                    data.data.user.email
                ) {
                    console.log('user exist and login');
                    navigate(`/`);
                } else {
                    console.log('user not exist and register');
                    openEditProfileModal();
                }
            },
            err => {
                console.log(err);

            }
        )
    }
    useEffect(() => {
        if (auth?.token && auth?.user) {
            if (!auth.user.email || !auth.user.name) {
                openEditProfileModal();
            } else {
                navigate('/home');
            }

        }
        else if (status && message && code) {
            if ((status === '200' && message === 'OK' && code) || error === 'USER_ALREADY_SUBSCRIBED') {
                fetchUser(code);
            }
        } else if (error) {
            console.log('subscription error', error);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const openEditProfileModal = () => {
        dispatch(modalsActions.openEditProfileModal());
    }
    return (
        <Fragment>
            {modals.editProfileModal && <EditProfile />}
            {modals.addNewRecordModal && <AddNewRecord />}
            {modals.loginModal && <NotRegistered />}
            {modals.mediaModal && <MediaPlayer />}
            <div className="basic-layout" >
                <Outlet></Outlet>
            </div>
        </Fragment>
    )
}

export default BasicLayout;