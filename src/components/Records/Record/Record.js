import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Translate from "../../../helpers/Translate/Translate";
import AudioPlayer from "./../../AudioPlayer/AudioPlayer";
import Comments from "./../../Comments/Comments";
import useHTTP from './../../../hooks/use-http';
import { getAuth } from "../../../utils/Auth";
import { Link } from "react-router-dom";
import Loader from "../../Loader/Loader";

const Record = (props) => {
  const img = require("../../../assets/images/personal.png");
  const { isLoading, sendRequest } = useHTTP();
  const [record, setRecord] = useState(props.record);
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(record?.is_liked);
  const [likesCount, setLikesCount] = useState(record?.likes_count);
  const [commentsCount, setCommentsCount] = useState(record?.comments_count);
  const { token } = getAuth();
  const { user } = getAuth();
  const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 10));
  const lang = useSelector(state => {
    return state.lang.globalLang;
  });

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
  }
  const handleFollow = () => {
    sendRequest(
      {
        url: `users/${record.user.id}/follow`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      },
      data => {
        // setUser(data.data);
      },
      err => {
      }
    )
  }
  const handleUnFollow = () => {
    sendRequest(
      {
        url: `users/${record.user.id}/unfollow`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      },
      data => {
        // setUser(data.data);
      },
      err => {
      }
    )
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
            user?.id !== record?.user?.id &&
            <span className="post-header-user-follow">
              {
                user?.is_followed ?
                  <i className="fa-solid fa-user-check" onClick={handleFollow}></i>
                  :
                  <i className="fa-solid fa-user-plus" onClick={handleUnFollow}></i>
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
          {/* <Translate id="record.surah" />  &nbsp;*/}
        </div>
        <div className="post-feedback">
          <span className="post-feedback-likes-comments">
            <p>{likesCount}</p>
            <i onClick={likeBtnHandler} className={`${isLiked ? 'fa-solid' : 'fa-regular'} fa-thumbs-up`}></i>
            <p>{commentsCount}</p>
            <i className="fa-regular fa-comment" onClick={() => setShowComments(prev => !prev)}></i>
          </span>
          <div>
            <span className="post-feedback-share">
              <i className="fa-solid fa-arrow-up-from-bracket"></i>
            </span>
          </div>
        </div>
        {showComments && <div className="post-comments">
          <Comments recordId={record?.id} onAddComment={onCommentAdded} />
        </div>}
      </div>
    </Fragment>

  );
};

export default Record;
