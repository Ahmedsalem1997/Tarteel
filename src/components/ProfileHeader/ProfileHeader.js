import Translate from "../../helpers/Translate/Translate";
import Modal from "../Modal/Modal";
import { useState,useEffect } from "react";
import EditProfile from "../EditProfile/EditProfile";
import { useSelector } from "react-redux";
import useHTTP from "../../hooks/use-http";
import { getAuth } from "../../utils/Auth";


const ProfileHeader = (x) => {
  // const [user, setUser] = useState([]);
  const { token } = getAuth();
  const [isOpen, setIsOpen] = useState(false);
  const auth = useSelector((state) => {
    return { isAuth: state.auth.isAuth, user: state.auth.user };
  });
  const {  sendRequest: getUser } = useHTTP();
//  useEffect(()=>{
//     console.log('useEffect');
//     getUser({
//         url : `profile`,
//         method : 'GET',
//         headers : { 'Authorization': `Bearer ${token}` }
//     },
//     (user)=>{
//         setUser(user.data)
//     }
//     )
//  },[user.data])
const {user} = getAuth();
  return (
    <div className="profile-header">
      <div className="profile-header-user">
        <img
          className="profile-header-user-img"
          src={user.avatar}
          alt="..."
        />
        <h2 className="profile-header-user-name">{user.name}</h2>
        <button className="profile-header-user-follow">
          <i className="fa-solid fa-user-plus"></i>
        </button>
        <button className="profile-header-user-follow followed">
          <i className="fa-solid fa-user-check"></i>
        </button>
        <button
          className="profile-header-user-follow"
          onClick={() => setIsOpen(true)}
        >
          <i className="fa-solid fa-user-pen"></i>
        </button>
      </div>
      <div className="profile-header-following">
        <div className="profile-header-following-followers">
          <span>{user.followers_count}</span>
          <span>
            <Translate id="profile.followers" />
          </span>
        </div>
        <div className="profile-header-following-followings">
          <span>{user.followings_count}</span>
          <span>
            <Translate id="profile.followings" />
          </span>
        </div>
      </div>
      {isOpen && (
        <Modal>
          <EditProfile
            setIsOpen={(setIsOpenValue) => setIsOpen(setIsOpenValue)}
          />
        </Modal>
      )}
    </div>
  );
};

export default ProfileHeader;
