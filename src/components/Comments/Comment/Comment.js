import AudioPlayer from "./../../AudioPlayer/AudioPlayer";
import useHTTP from "./../../../hooks/use-http";
import { getAuth } from "../../../utils/Auth";
import { useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import Loader from "../../Loader/Loader";

const Comment = (props) => {
  const lang = useSelector((state) => {
    return state.lang.globalLang;
  });
  const img = require("../../../assets/images/personal.png");
  const [comment, setComment] = useState(props.comment);
  const { isLoading, sendRequest } = useHTTP();
  const { token } = getAuth();
  const [isLiked, setIsLiked] = useState(comment.is_liked);
  const [likesCount, setLikesCount] = useState(comment.likes_count);
  const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 10));
  const { isAuth, loggedUser } = getAuth();
  const toggleLike = () => {
    setIsLiked(isLikedPrev => {
      setLikesCount(prev => isLikedPrev ? prev - 1 : prev + 1);
      return !isLikedPrev
    });
  }
  useEffect(() => {
    setRandomNum(Math.floor(Math.random() * 10));
  }, [lang])
  const likeBtnHandler = () => {
    toggleLike();
    sendRequest(
      {
        url: `comments/${comment?.id}/reactions`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: { reaction: comment?.is_liked ? `unlike` : `like` },
      },
      data => {
        setComment(data.data);
      },
      err => {
        toggleLike();
      }
    );
  };

  const deleteComment = (commentId) => {
    if (isAuth) {
      sendRequest(
        {
          url: `comments/${commentId}`,
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        },
        data => {
          // setRecordUser(data.data);
          // setComment({});
          console.log('delete comment');
          props.onDeleteComment();
        },
        err => {
        }
      )
    }
  }
  return (
    <Fragment>
      {isLoading && <Loader />}
      {comment && <div className="comment">
        <div className="comment-header">
          <div className="comment-header-user">
            <div className="comment-header-user-image">
              <img
                src={comment?.user?.avatar || img}
                className="d-block"
                alt="..."
              />
            </div>
            {comment?.user?.is_verified ? (
              <div className="comment-header-user-icon">
                <i className="fa-solid fa-circle-check"></i>
              </div>
            ) : (
              ""
            )}
            <div className="comment-header-user-name">
              <h3>{comment?.user?.name || "لا يوجد اسم"}</h3>
            </div>
          </div>
        </div>
        <div className="comment-content">
          {comment?.file && (
            <div className="comment-content-audio">
              <AudioPlayer audio={comment.file} key={Math.floor(Math.random() * 100) * randomNum} id={`comment-${comment?.id}`} />
            </div>
          )}
          {comment?.text && (
            <div className="comment-content-text">
              <p>{comment?.text}</p>
            </div>
          )}
          <div className="comment-content-feedback">
            <span className="comment-content-feedback-likes">
              <p>{likesCount}</p>
              <i
                onClick={likeBtnHandler}
                className={`${isLiked ? "fa-solid" : "fa-regular"
                  } fa-thumbs-up`}
              ></i>
            </span>
            <span>
              {lang === "ar"
                ? comment?.created_at_ar
                : comment?.created_at_en
              }
              &nbsp;&nbsp;
              {(comment?.user?.is_mine && loggedUser?.is_sheikh) ? <i className="fa-solid fa-trash-can error-color" onClick={() => deleteComment(comment.id)}></i> : ''}
            </span>
          </div>
        </div>
      </div>}

    </Fragment>
  );
};

export default Comment;
