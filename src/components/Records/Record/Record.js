import AudioPlayer from "./../../AudioPlayer/AudioPlayer";

const Record = () => {
  const img = require("../../../assets/images/personal.png");
  return (
    <div className="comment-container">
      <div className="comment-header">
        <div className="user">
          <div className="image">
            <img src={img} className="d-block" alt="..." />
          </div>
          <div>
            <h2>تامر عبد الشافي</h2>
            <p>منذ ٤ يوم</p>
          </div>
        </div>
        <span className="personal-icon">
          <i class="fa-solid fa-user-plus"></i>
        </span>
      </div>
      <AudioPlayer />
      <div className="comment-text">من الايه ٢ الي الايه ٧ سورة البقرة</div>
      <div className="comment-feedback">
        <span className="personal-icon">
          <p>1.490</p>
          <i class="fa-regular fa-thumbs-up"></i>
          <p>1.490</p>
          <i class="fa-regular fa-comment"></i>
        </span>
        <div>
          <span className="personal-icon">
            <i class="fa-solid fa-arrow-up-from-bracket"></i>{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Record;
