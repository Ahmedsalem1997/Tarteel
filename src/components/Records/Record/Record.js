import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Translate from "../../../helpers/Translate/Translate";
import AudioPlayer from "./../../AudioPlayer/AudioPlayer";
import Comments from "./../../Comments/Comments";
import useHTTP from './../../../hooks/use-http';
import { getAuth } from "../../../utils/Auth";
import { Link } from "react-router-dom";
import Loader from "../../Loader/Loader";
import { modalsActions } from "../../../store/Modals/Modals";

const Record = (props) => {
  const img = require("../../../assets/images/personal.png");
  const { isLoading, sendRequest } = useHTTP();
  const [record, setRecord] = useState(props.record);
  // const [recordUser, setRecordUser] = useState(record.user);
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(record?.is_liked);
  const [likesCount, setLikesCount] = useState(record?.likes_count);
  const [commentsCount, setCommentsCount] = useState(record?.comments_count);
  const { token, isAuth, loggedUser } = getAuth();
  const dispatch = useDispatch();
  const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 10));
  const lang = useSelector(state => {
    return state.lang.globalLang;
  });

  const openLoginModal = () => {
    dispatch(modalsActions.openLoginModal());
  }

  useEffect(() => {
    setRandomNum(Math.floor(Math.random() * 10));
  }, [lang])
  const toggleLike = () => {
    setIsLiked(isLikedPrev => {
      setLikesCount(prev => isLikedPrev ? prev - 1 : prev + 1);
      return !isLikedPrev
    });
  }

  const onCommentAdded = () => {
    setCommentsCount(prev => prev + 1);
  }
  const likeBtnHandler = () => {
    if (isAuth) {
      toggleLike();
      sendRequest(
        {
          url: `records/${record?.id}/reactions`,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: { reaction: record?.is_liked ? `unlike` : `like` }
        },
        data => {
          setRecord(data.data);
          setCommentsCount(data.data.comments_count);
        },
        err => {
          toggleLike();
        }
      )
    } else {
      openLoginModal();
    }
  }
  const shareBtnHandler = () => {
    if (isAuth) {
      // toggleLike();
      sendRequest(
        {
          url: `records/${record?.id}/reactions`,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: { reaction: record?.is_shared ? `unshare` : `share` }
        },
        data => {
          setRecord(data.data);
          // setCommentsCount(data.data.comments_count);
        },
        err => {
          // toggleLike();
        }
      )
    } else {
      openLoginModal();
    }
  }
  const handleFollow = () => {
    if (isAuth) {
      sendRequest(
        {
          url: `users/${record.user.id}/follow`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        },
        data => {
          // setRecordUser(data.data);
          props.onRecordChange();
        },
        err => {
        }
      )
    } else {
      openLoginModal();
    }
  }
  const handleUnFollow = () => {
    if (isAuth) {
      sendRequest(
        {
          url: `users/${record.user.id}/unfollow`,
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        },
        data => {
          // setRecordUser(data.data);
          props.onRecordChange();
        },
        err => {
        }
      )
    } else {
      openLoginModal();
    }
  }
  const deleteRecord = (recordId) => {
    if (isAuth) {
      sendRequest(
        {
          url: `records/${recordId}`,
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        },
        data => {
          // setRecordUser(data.data);
          props.onRecordChange();
        },
        err => {
        }
      )
    } else {
      openLoginModal();
    }
  }



  return (
    <Fragment>
      {isLoading && <Loader />}
      <div className="post">
        <div className="post-header">

          <div className="post-header-user">
            <div className="post-header-user-image">
              <img src={record?.user?.avatar || img} className="d-block" alt="..." />
            </div>
            <div className="post-header-user-name">
              <Link to={`/users/${record?.user?.id}`}>
                <h3>{record?.user?.name || 'لا يوجد اسم'}</h3>
              </Link>
              <p>{lang === 'ar' ? record?.created_at_ar : record?.created_at_en}</p>
            </div>
          </div>
          {
            ((loggedUser?.id !== record?.user?.id) && !props.hideFollow) &&
            <span className="post-header-user-follow">
              {
                props?.record?.user?.is_followed ?
                  <i className="fa-solid fa-user-check" onClick={handleUnFollow}></i>
                  :
                  <i className="fa-solid fa-user-plus" onClick={handleFollow}></i>
              }
            </span>
          }
        </div>
        <AudioPlayer audio={record.file} key={Math.floor(Math.random() * 100) * randomNum} id={`record-${record?.id}`} />
        <div className="post-text">
          <Translate id="record.fromAyah" /> &nbsp;
          {record?.from_ayah_number} &nbsp;
          <Translate id="record.toAyah" /> &nbsp;
          {record?.to_ayah_number} &nbsp;
          {lang === 'ar' ? record?.surah?.name : record?.surah?.english_name}
        </div>
        <div className="post-feedback">
          <span className="post-feedback-likes-comments">
            <p>{likesCount}</p>
            <i onClick={likeBtnHandler} className={`${isLiked ? 'fa-solid' : 'fa-regular'} fa-thumbs-up`}></i>
            <p>{commentsCount}</p>
            <i className="fa-regular fa-comment" onClick={() => setShowComments(prev => !prev)}></i>
          </span>
          <span>
            <span className="post-feedback-likes-comments">
              <p>{record?.shares_count}</p>
              {record?.user?.is_mine && <i onClick={shareBtnHandler} className="fa-solid fa-arrow-up-from-bracket"></i>}
              <i className="fa-solid fa-trash-can error-color" onClick={ () => deleteRecord(record.id) }></i>
            </span>
          </span>
        </div>
        {showComments && <div className="post-comments">
          <Comments recordId={record?.id} onAddComment={onCommentAdded} />
        </div>}
      </div>
    </Fragment>

  );
};

export default Record;
