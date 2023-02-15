import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Translate from "../../../helpers/Translate/Translate";
import AddComment from "../../Comments/AddComment/AddComment";
import AudioPlayer from "./../../AudioPlayer/AudioPlayer";
import Comments from "./../../Comments/Comments";
import useHTTP from './../../../hooks/use-http';
import { getAuth } from "../../../utils/Auth";
import { recordsActions } from "../../../store/Records/Records";
import { Link } from "react-router-dom";

const Record = (props) => {
  const img = require("../../../assets/images/personal.png");
  const { sendRequest: toggleLike } = useHTTP();
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(props.record.is_liked);
  const [likesCount, setLikesCount] = useState(props.record.likes_count);
  const { token } = getAuth();
  const dispatch = useDispatch();
  const likeBtnHandler = () => {
    setLikesCount(prev => isLiked ? prev-- : prev++);
    setIsLiked(prev => prev = !isLiked);
    toggleLike(
      {
        url: `records/${props?.record?.id}/reactions`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: { 'reaction': props?.record?.is_liked ? `unlike` : `like` }
      },
      data => {
        setIsLiked(data.data.is_liked);
        setLikesCount(data.data.likes_count);
        dispatch(recordsActions.updateLatestRecords());
        dispatch(recordsActions.updateMyRecords());
        // dispatch(recordsActions.updateMyRecordsHome());
      },
      err => {
        setLikesCount(prev => isLiked ? prev-- : prev++);
        setIsLiked(prev => prev = !isLiked);
      }
    )
  }
  const { user } = getAuth();
  const lang = useSelector(state => {
    return state.lang.globalLang;
  });
  return (
    <div className="post">
      <div className="post-header">
        <Link to={`/profile/${props.record.user.id}`} style={{textDecoration : 'none', color :'white'}}>
        <div className="post-header-user">
          <div className="post-header-user-image">
            <img src={props?.user?.avatar || img} className="d-block" alt="..." />
          </div>
          <div className="post-header-user-name">
            <h3>{props?.record?.user?.name || 'لا يوجد اسم'}</h3>
            <p>{lang === 'ar' ? props?.record?.created_at_ar : props?.record?.created_at_en}</p>
          </div>
        </div>
        </Link>
        {
          user?.id !== props?.record?.user?.id &&
          <span className="post-header-user-follow">
            <i className="fa-solid fa-user-plus"></i>
            <i className="fa-solid fa-user-check"></i>
          </span>
        }
      </div>
      <AudioPlayer id={`record-${props?.record?.id}`} />
      <div className="post-text">
        <Translate id="record.fromAyah" /> &nbsp;
        {props?.record?.from_ayah_number} &nbsp;
        <Translate id="record.toAyah" /> &nbsp;
        {props?.record?.to_ayah_number} &nbsp;
        {/* <Translate id="record.surah" />  &nbsp;*/}
        {lang === 'ar' ? props?.record?.surah?.name : props?.record?.surah?.english_name}
      </div>
      <div className="post-feedback">
        <span className="post-feedback-likes-comments">
          <p>{likesCount}</p>
          <i onClick={likeBtnHandler} className={`${isLiked ? 'fa-solid' : 'fa-regular'} fa-thumbs-up`}></i>
          <p>{props?.record?.comments_count}</p>
          <i className="fa-regular fa-comment" onClick={() => setShowComments(prev => !prev)}></i>
        </span>
        <div>
          <span className="post-feedback-share">
            <i className="fa-solid fa-arrow-up-from-bracket"></i>
          </span>
        </div>
      </div>
      {showComments && <div className="post-comments">
        <Comments recordId={props?.record?.id} />
      </div>}
      {showComments && <div className="post-add-comment">
        <AddComment recordId={props?.record?.id} />
      </div>}
    </div>
  );
};

export default Record;
