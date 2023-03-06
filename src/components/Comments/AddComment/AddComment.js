import Joi from 'joi';
import { Fragment, useState } from "react";
import Translate from "../../../helpers/Translate/Translate";
import useTranslate from "../../../hooks/use-translate";
import useHTTP from "../../../hooks/use-http";
import { getAuth } from "../../../utils/Auth";
import Loader from "../../Loader/Loader";
import { useDispatch } from "react-redux";
import { modalsActions } from "../../../store/Modals/Modals";
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import AudioRecord from '../../AudioRecord/AudioRecord';


const AddComment = (props) => {
  const [comment, setComment] = useState('');
  const { isLoading, error, sendRequest: addComment } = useHTTP();
  const auth = getAuth();
  const [commentErr, setCommentErr] = useState('');
  const [uploadedRecord, setUploadedRecord] = useState(undefined);
  const dispatch = useDispatch();
  const openLoginModal = () => {
    dispatch(modalsActions.openLoginModal());
  }
  const addCommentHandler = (e) => {
    e.preventDefault();
    let formData = new FormData();
    if (auth.isAuth) {
      if (auth.loggedUser.is_sheikh) {
        if (uploadedRecord || comment) {
          if (uploadedRecord) {
            formData.append('file', uploadedRecord);
          }
          if (comment) {
            formData.append('text', comment);
          }
          addingComment(formData);
        } else {
          setCommentErr('comment');
        }
      } else {
        if (comment) {
          if (comment.trim().length > 3) {
            formData.append('text', comment);
            addingComment(formData);
          }
          else {
            setCommentErr('comment');
          }
        }
      }
    } else {
      openLoginModal();
    }
  }

  const addingComment = (dataToSend) => {
    addComment(
      {
        url: `records/${props.recordId}/comments`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${auth.token}`
        },
        body: dataToSend
      },
      data => {
        // console.log(data);
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

  const onChangeComment = (e) => {
    const schema = Joi.object({
      comment: Joi.string()
        .pattern(/^[a-zA-Z\u0621-\u064A0-9 ]{3,200}$/)
        // .min(3)
        // .max(100)
        .required(),
    })
    const commentError = schema.validate({ comment: e.target.value });
    if (commentError.error) {
      setCommentErr('comment');
    } else {
      setCommentErr('');
    }
    setComment(e.target.value);
  }
  return (
    <Fragment>
      {isLoading && <Loader />}
      <form className="add-comment" onSubmit={addCommentHandler}>
        <div className="add-comment-input">
          <textarea disabled={!auth.isAuth} value={comment} onChange={onChangeComment} placeholder={useTranslate('input.placeholder.writeComment')}></textarea>
          <ErrorMessage message={commentErr} />
        </div>

        <div className="add-comment-actions">
          {auth?.loggedUser?.is_sheikh ?
            <AudioRecord onRecordFinished={onRecordFinished} onIsRecordingChange={() => { return }} />
            :
            ''
          }
          <button type="submit" disabled={!auth.isAuth || !(comment || uploadedRecord)}><Translate id="button.addComment" /></button>
        </div>
      </form>
    </Fragment>
  );
};

export default AddComment;
