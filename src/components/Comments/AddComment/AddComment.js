import { Fragment, useState } from "react";
import Translate from "../../../helpers/Translate/Translate";
import useTranslate from "../../../hooks/use-translate";
import useHTTP from "../../../hooks/use-http";
import { getAuth } from "../../../utils/Auth";
import Loader from "../../Loader/Loader";
import AddNewRecord from "../../AddNewRecord/AddNewRecord";
import AudioRecord from "../../AudioRecord/AudioRecord";

const AddComment = (props) => {
  const [comment, setComment] = useState('');
  const { isLoading, error, sendRequest: addComment } = useHTTP()
  const auth = getAuth();
  const [uploadedRecord, setUploadedRecord] = useState(undefined);

  const addCommentHandler = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('text', comment);
    if (uploadedRecord) {
      formData.append('file', uploadedRecord);
    }
    addComment(
      {
        url: `records/${props.recordId}/comments`,
        method: 'POST',
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        },
        body: formData
      },
      data => {
        console.log(data);
        setComment('');
        props.onAddComment();
      },
      err => {

      }
    )
  }
  const onRecordFinished = (blob) => {
    setUploadedRecord(blob);
  }

  return (
    <Fragment>
      {isLoading && <Loader />}
      <form className="add-comment" onSubmit={addCommentHandler}>
        <div className="add-comment-input">
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder={useTranslate('input.placeholder.writeComment')}></textarea>
        </div>

        <div className="add-comment-actions">
          <button type="submit"><Translate id="button.addComment" /></button>
          {auth?.loggedUser?.is_sheikh && <AudioRecord onRecordFinished={onRecordFinished} showTitle={false} />}
        </div>
      </form>
    </Fragment>
  );
};

export default AddComment;
