import { Translate } from "../../../helpers/Translate/Translate";
import useTranslate from "../../../hooks/use-translate";

const AddComment = () => {
  return (
    <div className="add-comment">
      <div className="add-comment-input">
        <textarea placeholder={useTranslate('input.placeholder.writeComment')}></textarea>
      </div>
      <div className="add-comment-actions">
        <button><Translate id="button.addComment" /></button>
        <button className="">
          <i className="fa-solid fa-microphone"></i>
        </button>
      </div>
    </div>
  );
};

export default AddComment;
