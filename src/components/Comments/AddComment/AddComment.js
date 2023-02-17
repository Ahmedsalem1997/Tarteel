import { Fragment, useState } from "react";
import Translate from "../../../helpers/Translate/Translate";
import useTranslate from "../../../hooks/use-translate";
import useHTTP from "../../../hooks/use-http";
import { getAuth } from "../../../utils/Auth";
import Loader from "../../Loader/Loader";

const AddComment = (props) => {
  const [comment, setComment] = useState('');
  const { isLoading, error, sendRequest: addComment } = useHTTP()
  const { token } = getAuth()
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
    <Fragment>
       {isLoading && <Loader />}
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
    </Fragment>
  );
};

export default AddComment;
