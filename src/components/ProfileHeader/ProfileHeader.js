import Translate from "../../helpers/Translate/Translate";
import { useState, useEffect } from "react";
import { getAuth } from "../../utils/Auth";
import { useParams } from "react-router";
import useHTTP from "../../hooks/use-http";
import { useDispatch } from "react-redux";
import { modalsActions } from "../../store/Modals/Modals";

const ProfileHeader = (x) => {
  const [followersCount, setFollowersCount] = useState(0);
  const { token } = getAuth();
  const { sendRequest } = useHTTP();

  const [userData, setUserData] = useState();
  let params = useParams();

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
          setFollowersCount(data.data.followers_count);
        }
      );
    } else {
      const { user } = getAuth();
      console.log(user);
      setUserData(user);
      setFollowersCount(user.followers_count);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [followersCount]);
  const handleFollow = () => {
    setFollowersCount(prev => prev++);
    sendRequest(
      {
        url: `users/${params.id}/follow`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      },
      data => {
        setFollowersCount(data.data.followers_count);
      }
    )
  }
  const handleUnFollow = () => {
    setFollowersCount(prev => prev--);
    sendRequest(
      {
        url: `users/${params.id}/unfollow`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      },
      data => {
        setFollowersCount(data.data.followers_count);
      }
    )
  }

  const dispatch = useDispatch();
  const openEditProfileModal = () => {
    dispatch(modalsActions.openEditProfileModal());
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
          onClick={openEditProfileModal}
        >
          <i className="fa-solid fa-user-pen"></i>
        </button>}
      </div>
      <div className="profile-header-following">
        <div className="profile-header-following-followers">
          <span>{followersCount}</span>
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
    </div>
  );
};

export default ProfileHeader;
