import AudioPlayer from "./../../AudioPlayer/AudioPlayer";
import useHTTP from "./../../../hooks/use-http";
import { getAuth } from "../../../utils/Auth";
import { useSelector } from "react-redux";
import { useState } from "react";
// import { useState } from "react";

const Comment = (props) => {
  const lang = useSelector((state) => {
    return state.lang.globalLang;
  });
  const img = require("../../../assets/images/personal.png");
  const [comment, setComment] = useState(props.comment);
  const { sendRequest } = useHTTP();
  const { token } = getAuth();
  // const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(comment.is_liked);
  const [likesCount, setLikesCount] = useState(comment.likes_count);
  const toggleLike = () => {
    setIsLiked(isLikedPrev => {
      setLikesCount(prev => isLikedPrev ? prev - 1 : prev + 1);
      return !isLikedPrev
    });
  }
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
  return (
    <div className="comment">
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
            <AudioPlayer id={`comment-${comment?.id}`} />
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
              : comment?.created_at_en}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
