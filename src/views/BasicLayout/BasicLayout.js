import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import AddNewRecord from "../../components/AddNewRecord/AddNewRecord";
import EditProfile from "../../components/EditProfile/EditProfile";
import MediaPlayer from "../../components/MediaPlayer/MediaPlayer";
import NotRegistered from "../../components/NotRegistered/NotRegistered";

const BasicLayout = () => {
    const modals = useSelector(state => state.modals);
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