import { useState } from "react";
import { useSelector } from "react-redux";
import Translate from "../../../helpers/Translate/Translate";
import useTranslate from "../../../hooks/use-translate";
import useHTTP from "../../../hooks/use-http"

const AddComment = (props) => {
  const [comment, setComment] = useState('');
  const { isLoading, error, sendRequest: addComment } = useHTTP()
  const token = useSelector(state => {
    return state.auth.token;
  });
  const addCommentHandler = (e) => {
    e.preventDefault();
    addComment(
      {
        url: `records/${props.recordId}/comments`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: {
          text: comment
        }
      },
      data => {
        console.log(data);
      }
    )
  }
  return (
    <form className="add-comment" onSubmit={addCommentHandler}>
      <div className="add-comment-input">
        <textarea onChange={(e) => setComment(e.target.value)} placeholder={useTranslate('input.placeholder.writeComment')}></textarea>
      </div>
      <div className="add-comment-actions">
        <button type="submit"><Translate id="button.addComment" /></button>
        <button className="" type="button">
          <i className="fa-solid fa-microphone"></i>
        </button>
      </div>
    </form>
  );
};

export default AddComment;
