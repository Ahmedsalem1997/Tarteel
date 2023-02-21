import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import AddNewRecord from "../../components/AddNewRecord/AddNewRecord";
import EditProfile from "../../components/EditProfile/EditProfile";
import MediaPlayer from "../../components/MediaPlayer/MediaPlayer";
import NotRegistered from "../../components/NotRegistered/NotRegistered";
import useHTTP from "../../hooks/use-http";
import { modalsActions } from "../../store/Modals/Modals";
import { getAuth, setAuth } from "../../utils/Auth";

const BasicLayout = () => {
    const modals = useSelector(state => state.modals);
    const [searchParams, setSearchParams] = useSearchParams();
    const [code, setCode] = useState(searchParams.get('code'));
    const [status, setstatus] = useState(searchParams.get('status'));
    const [message, setMessage] = useState(searchParams.get('message'));
    const [error, setError] = useState(searchParams.get('error'));
    const { isLoading, error: requestError, sendRequest } = useHTTP();
    let auth = getAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchCurrentUser = () => {
        sendRequest(
            {
                url: `users/${auth.loggedUser.id}`,
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            },
            (data) => {
                setAuth({ loggedUser: data.data });
                if (!data.data.email || !data.data.name) {
                    openEditProfileModal();
                } else {
                    navigate('/home');
                }
            },
            err => {
                navigate('/home');
            }
        )
    }

    useEffect(() => {
        if (auth?.isAuth) {
            fetchCurrentUser();
        } else {
            navigate('/home');
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