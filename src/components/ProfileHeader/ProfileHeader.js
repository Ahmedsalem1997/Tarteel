import Translate from "../../helpers/Translate/Translate";
import Modal from "../Modal/Modal";
import { useState, useEffect } from "react";
import EditProfile from "../EditProfile/EditProfile";
// import { useSelector } from "react-redux";
import { getAuth } from "../../utils/Auth";
import { useParams } from "react-router";
import useHTTP from "../../hooks/use-http";

const ProfileHeader = (x) => {
  const { token } = getAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { sendRequest } = useHTTP();

  const [userData, setUserData] = useState();
  let params = useParams();

  // const auth = useSelector((state) => {
  //   return { isAuth: state.auth.isAuth, user: state.auth.user };
  // });


  useEffect(() => {
    if (params.id) {
      sendRequest(
        {
          url: `users/${params.id}`,
          method: "GET",
          header: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
        (data) => {
          setUserData(data.data);
        }
      );
    } else {
      const { user } = getAuth();
      setUserData(user);
      console.log(userData, user);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleFollow = () => {
    sendRequest({
      url: `users/${params.id}/follow`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
  }
  const handleUnFollow = () => {
    sendRequest({
      url: `users/${params.id}/unfollow`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
  }
  return (
    <div className="profile-header">
      <div className="profile-header-user">
        <img className="profile-header-user-img" src={userData?.avatar} alt="..." />
        <h2 className="profile-header-user-name">{userData?.name}</h2>
        <button onClick={handleFollow} className="profile-header-user-follow">
          <i className="fa-solid fa-user-plus"></i>
        </button>
        <button onClick={handleUnFollow} className="profile-header-user-follow followed">
          <i className="fa-solid fa-user-check"></i>
        </button>
        {params.id ? "" : <button
          className="profile-header-user-follow"
          onClick={() => setIsOpen(true)}
        >
          <i className="fa-solid fa-user-pen"></i>
        </button>}
      </div>
      <div className="profile-header-following">
        <div className="profile-header-following-followers">
          <span>{userData?.followers_count}</span>
          <span>
            <Translate id="profile.followers" />
          </span>
        </div>
        <div className="profile-header-following-followings">
          <span>{userData?.followings_count}</span>
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
