import Joi from 'joi';
import { Fragment, useState } from "react";
import Translate from "../../../helpers/Translate/Translate";
import useTranslate from "../../../hooks/use-translate";
import useHTTP from "../../../hooks/use-http";
import { getAuth } from "../../../utils/Auth";
import Loader from "../../Loader/Loader";
import { useDispatch } from "react-redux";
import { modalsActions } from "../../../store/Modals/Modals";
import { useAudioRecorder, AudioRecorder } from "react-audio-voice-recorder";
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

const AddComment = (props) => {
  const [comment, setComment] = useState('');
  const { isLoading, error, sendRequest: addComment } = useHTTP()
  const auth = getAuth();
  const [commentErr, setCommentErr] = useState('');
  const [uploadedRecord, setUploadedRecord] = useState(undefined);
  const dispatch = useDispatch();
  const openLoginModal = () => {
    dispatch(modalsActions.openLoginModal());
  }
  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
  } = useAudioRecorder();
  const addCommentHandler = (e) => {
    e.preventDefault();
    if (auth.isAuth) {
      if (comment.trim().length > 3) {
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
              'Authorization': `Bearer ${auth.token}`
            },
            body: formData
          },
          data => {
            // console.log(data);
            setComment('');
            props.onAddComment();
          },
          err => {

          }
        )
      } else {
        setCommentErr('comment');
      }
    } else {
      openLoginModal();
    }
  }
  const onRecordFinished = (blob) => {
    setUploadedRecord(blob);
  }

  const handlerRecordBtn = () => {
    if (!isRecording && !recordingBlob) {
      startRecording();
    }
    // console.log(recordingBlob, recordingTime);
  }

  const handleStopRecording = () => {
    stopRecording();
    // setUploadedRecord(recordingBlob);
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
        {
          (!isRecording && recordingBlob) &&
          <div className="add-comment-audio">
            {/* &nbsp;
                  <i className="fa-solid fa-trash-can"></i> */}
          </div>

        }
        <div className="add-comment-actions">
          <button type="submit" disabled={!auth.isAuth}><Translate id="button.addComment" /></button>
          <AudioRecorder
            onRecordingComplete={(blob) => onRecordFinished(blob)}
            recorderControls={{
              startRecording,
              stopRecording,
              togglePauseResume,
              recordingBlob,
              isRecording,
              isPaused,
              recordingTime,
            }}
          />
          {
            auth?.loggedUser?.is_sheikh ?
              <button type="button" onClick={handlerRecordBtn}>
                {(!isRecording && !recordingBlob) && <i className="fa-solid fa-microphone"></i>}
                {
                  isRecording &&
                  <span>
                    <i className="fa-solid fa-circle-stop" onClick={handleStopRecording}></i>&nbsp;
                    {isPaused ?
                      <i className="fa-solid fa-circle-play" onClick={togglePauseResume}></i>
                      :
                      <i className="fa-solid fa-circle-pause" onClick={togglePauseResume}></i>
                    }
                    &nbsp;
                    {recordingTime}
                  </span>
                }
                {(!isRecording && recordingBlob) && <audio id='record-audio' style={{ maxWidth: '100%' }} src={URL.createObjectURL(recordingBlob)} controls></audio>}
              </button> :
              ''
          }
        </div>
      </form>
    </Fragment>
  );
};

export default AddComment;
