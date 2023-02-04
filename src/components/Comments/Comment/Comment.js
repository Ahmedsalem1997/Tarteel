import AudioPlayer from "./../../AudioPlayer/AudioPlayer";

const Comment = () => {
  const img = require("../../../assets/images/personal.png");
  return (
    <div className="comment">
      <div className="comment-header">
        <div className="comment-header-user">
          <div className="comment-header-user-image">
            <img src={img} className="d-block" alt="..." />
          </div>
          <div className="comment-header-user-icon">
            <i className="fa-solid fa-circle-check"></i>
          </div>
          <div className="comment-header-user-name">
            <h3>احمد بن علي</h3>
          </div>
        </div>
      </div>
      <div className="comment-content">
        <div className="comment-content-audio">
          <AudioPlayer id={Math.floor(Math.random()*1000)} />
        </div>
        <div className="comment-content-text">
          <p>
            بسم الله ان شاء الله جزاكم الله خير. ربنا يثبتك ويثبتنا إن شاء الله
            ويجعل صوتك سببا في هداية الناس جميعا ……… حقا ما أجمل تلاوة إن شاء
            الله. السلام عليكم ورحمة الله وبركاته. بسم الله ان شاء الله جزاكم
            الله خير. ربنا يثبتك ويثبتنا إن شاء الله ويجعل صوتك سببا في هداية
            الناس جميعا ……… حقا ما أجمل تلاوة إن شاء الله. السلام عليكم ورحمة
            الله وبركاته.
          </p>
        </div>
        <div className="comment-content-feedback">
          <span className="comment-content-feedback-likes">
            <p>1.490</p>
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
