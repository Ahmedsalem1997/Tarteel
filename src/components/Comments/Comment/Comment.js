import AudioPlayer from "./../../AudioPlayer/AudioPlayer";

const Comment = (props) => {
  const img = require("../../../assets/images/personal.png");
  return (
    <div className="comment">
      <div className="comment-header">
        <div className="comment-header-user">
          <div className="comment-header-user-image">
            <img src={props?.comment?.user?.avatar || img} className="d-block" alt="..." />
          </div>
          {
            props?.comment?.user?.is_verified ?
              <div className="comment-header-user-icon">
                <i className="fa-solid fa-circle-check"></i>
              </div>
              :
              ''
          }
          <div className="comment-header-user-name">
            <h3>{props?.comment?.user?.name || 'لا يوجد اسم'}</h3>
          </div>
        </div>
      </div>
      <div className="comment-content">
        {
          props?.comment?.file &&
          <div className="comment-content-audio">
            <AudioPlayer id={`comment-${props?.comment?.id}`} />
          </div>
        }
        {
          props?.comment?.text &&
          <div className="comment-content-text">
            <p>
              {props?.comment?.text}
            </p>
          </div>
        }
        <div className="comment-content-feedback">
          <span className="comment-content-feedback-likes">
            <p>{props?.comment?.likes_count}</p>
            <i className="fa-regular fa-thumbs-up"></i>
          </span>
          <span>
            منذ يوم
          </span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
