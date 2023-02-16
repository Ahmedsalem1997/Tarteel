import { useState } from "react";
import { useSelector } from "react-redux";
import Translate from "../../../helpers/Translate/Translate";
import AddComment from "../../Comments/AddComment/AddComment";
import AudioPlayer from "./../../AudioPlayer/AudioPlayer";
import Comments from "./../../Comments/Comments";
import useHTTP from './../../../hooks/use-http';
import { getAuth } from "../../../utils/Auth";
import { Link } from "react-router-dom";

const Record = (props) => {
  const img = require("../../../assets/images/personal.png");
  const { sendRequest } = useHTTP();
  const [record, setRecord] = useState(props.record);
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(record?.is_liked);
  const [likesCount, setLikesCount] = useState(record?.likes_count);
  const { token } = getAuth();
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
      },
      err => {
        toggleLike();
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
        <Link to={`/profile/${record.user.id}`} style={{ textDecoration: 'none', color: 'white' }}>
          <div className="post-header-user">
            <div className="post-header-user-image">
              <img src={record?.user?.avatar || img} className="d-block" alt="..." />
            </div>
            <div className="post-header-user-name">
              <h3>{record?.user?.name || 'لا يوجد اسم'}</h3>
              <p>{lang === 'ar' ? record?.created_at_ar : record?.created_at_en}</p>
            </div>
          </div>
        </Link>
        {
          user?.id !== record?.user?.id &&
          <span className="post-header-user-follow">
            <i className="fa-solid fa-user-plus"></i>
            <i className="fa-solid fa-user-check"></i>
          </span>
        }
      </div>
      <AudioPlayer id={`record-${record?.id}`} />
      <div className="post-text">
        <Translate id="record.fromAyah" /> &nbsp;
        {record?.from_ayah_number} &nbsp;
        <Translate id="record.toAyah" /> &nbsp;
        {record?.to_ayah_number} &nbsp;
        {/* <Translate id="record.surah" />  &nbsp;*/}
        {lang === 'ar' ? record?.surah?.name : record?.surah?.english_name}
      </div>
      <div className="post-feedback">
        <span className="post-feedback-likes-comments">
          <p>{likesCount}</p>
          <i onClick={likeBtnHandler} className={`${isLiked ? 'fa-solid' : 'fa-regular'} fa-thumbs-up`}></i>
          <p>{record?.comments_count}</p>
          <i className="fa-regular fa-comment" onClick={() => setShowComments(prev => !prev)}></i>
        </span>
        <div>
          <span className="post-feedback-share">
            <i className="fa-solid fa-arrow-up-from-bracket"></i>
          </span>
        </div>
      </div>
      {showComments && <div className="post-comments">
        <Comments recordId={record?.id} />
      </div>}
      {showComments && <div className="post-add-comment">
        <AddComment recordId={record?.id} />
      </div>}
    </div>
  );
};

export default Record;
