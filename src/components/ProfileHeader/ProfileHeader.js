import Translate from "../../helpers/Translate/Translate";
import { useState, useEffect } from "react";
import { getAuth } from "../../utils/Auth";
import useHTTP from "../../hooks/use-http";
import { useDispatch } from "react-redux";
import { modalsActions } from "../../store/Modals/Modals";

const ProfileHeader = (props) => {
  const [followersCount, setFollowersCount] = useState(0);
  const { token } = getAuth();
  const { sendRequest } = useHTTP();

  const [user, setUser] = useState();

  const getUserData = () => {
    sendRequest(
      {
        url: `users/${props.id}`,
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      },
      (data) => {
        setUser(data.data);
        // setFollowersCount(data.data.followers_count);
      }
    );
  }
  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.id]);
  const handleFollow = () => {
    setFollowersCount(prev => prev + 1);
    sendRequest(
      {
        url: `users/${props.id}/follow`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      },
      data => {
        setUser(data.data);
        setFollowersCount(data.data.followers_count);
      },
      err => {
        setFollowersCount(prev => prev - 1);
      }
    )
  }
  const handleUnFollow = () => {
    setFollowersCount(prev => prev - 1);
    sendRequest(
      {
        url: `users/${props.id}/unfollow`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      },
      data => {
        setUser(data.data);
        setFollowersCount(data.data.followers_count);
      },
      err => {
        setFollowersCount(prev => prev + 1);
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
        <img className="profile-header-user-img" src={user?.avatar} alt="..." />
        <h2 className="profile-header-user-name">{user?.name}</h2>
        {
          user?.is_mine &&
          <button
            className="profile-header-user-follow"
            onClick={openEditProfileModal}>
            <i className="fa-solid fa-user-pen"></i>
          </button>
        }
        {
          !user?.is_mine &&
          <button onClick={handleFollow} className="profile-header-user-follow">
            <i className="fa-solid fa-user-plus"></i>
          </button>
        }
        {
          !user?.is_mine &&
          <button onClick={handleUnFollow} className="profile-header-user-follow followed">
            <i className="fa-solid fa-user-check"></i>
          </button>

        }
      </div>
      <div className="profile-header-following">
        <div className="profile-header-following-followers">
          <span>{followersCount}</span>
          <span>
            <Translate id="profile.followers" />
          </span>
        </div>
        <div className="profile-header-following-followings">
          <span>{user?.followings_count}</span>
          <span>
            <Translate id="profile.followings" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
