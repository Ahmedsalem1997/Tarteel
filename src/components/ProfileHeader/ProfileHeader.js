import Translate from "../../helpers/Translate/Translate";
import Modal from "../Modal/Modal";
import { useState, useEffect } from "react";
import EditProfile from "../EditProfile/EditProfile";
import { useSelector } from "react-redux";
import { getAuth } from "../../utils/Auth";
import { useParams } from "react-router";
import useHTTP from "../../hooks/use-http";

const ProfileHeader = (x) => {
  const { token } = getAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { sendRequest: profileData } = useHTTP();
  const [userData, setUserData] = useState();
  const auth = useSelector((state) => {
    return { isAuth: state.auth.isAuth, user: state.auth.user };
  });
  let params = useParams();
  useEffect(() => {
    if (params) {
      profileData(
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
    }
  }, []);
  return (
    <div className="profile-header">
      <div className="profile-header-user">
        <img className="profile-header-user-img" src={userData?.avatar} alt="..." />
        <h2 className="profile-header-user-name">{userData?.name}</h2>
        <button className="profile-header-user-follow">
          <i className="fa-solid fa-user-plus"></i>
        </button>
        <button className="profile-header-user-follow followed">
          <i className="fa-solid fa-user-check"></i>
        </button>
        {params ? "" :<button
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
