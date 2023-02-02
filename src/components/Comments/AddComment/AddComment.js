const AddComment = () => {
  return (
    <div className="add-comment">
      <div className="add-comment-input">
        <textarea placeholder="اكتب تعليقا"></textarea>
      </div>
      <div className="add-comment-actions">
        <button>أضف تعليق</button>
        <button className="">
          <i className="fa-solid fa-microphone"></i>
        </button>
      </div>
    </div>
  );
};

export default AddComment;
