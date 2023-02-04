import Translate from "../../../helpers/Translate/Translate";
import AddComment from "../../Comments/AddComment/AddComment";
import AudioPlayer from "./../../AudioPlayer/AudioPlayer";
import Comments from "./../../Comments/Comments";

const Record = () => {
  const img = require("../../../assets/images/personal.png");
  return (
    <div className="post">
      <div className="post-header">
        <div className="post-header-user">
          <div className="post-header-user-image">
            <img src={img} className="d-block" alt="..." />
          </div>
          <div className="post-header-user-name">
            <h3>تامر عبد الشافي</h3>
            <p>منذ ٤ يوم</p>
          </div>
        </div>
        <span className="post-header-user-follow">
          <i className="fa-solid fa-user-plus"></i>
        </span>
      </div>
      <AudioPlayer />
      <div className="post-text"><Translate id="record.fromAya" /> 2 <Translate id="record.toAya" /> 7 <Translate id="record.sora" /> البقرة</div>
      <div className="post-feedback">
        <span className="post-feedback-likes-comments">
          <p>1.490</p>
          <i className="fa-regular fa-thumbs-up"></i>
          <p>1.490</p>
          <i className="fa-regular fa-comment"></i>
        </span>
        <div>
          <span className="post-feedback-share">
            <i className="fa-solid fa-arrow-up-from-bracket"></i>
          </span>
        </div>
      </div>
      <div className="post-comments">
        <Comments />
      </div>
      <div className="post-add-comment">
        <AddComment />
      </div>
    </div>
  );
};

export default Record;
