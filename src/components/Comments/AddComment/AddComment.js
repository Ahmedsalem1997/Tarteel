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
import MicRecorder from 'mic-recorder-to-mp3';


const AddComment = (props) => {
  const [Mp3Recorder, setMp3Recorder] = useState(
    new MicRecorder({ bitRate: 128 })
  );
  const [recordingTimeInterval, setRecordingTimeInterval] = useState();
  const [comment, setComment] = useState('');
  const { isLoading, error, sendRequest: addComment } = useHTTP();
  const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 1000));
  const auth = getAuth();
  const [commentErr, setCommentErr] = useState('');
  const [uploadedRecord, setUploadedRecord] = useState(undefined);
  const dispatch = useDispatch();
  const openLoginModal = () => {
    dispatch(modalsActions.openLoginModal());
  }
  const [isMp3Recording, setIsMp3Recording] = useState(false);
  const [recordingMp3Time, setRecordingMp3Time] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blobUrl, setBlobUrl] = useState('');
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

      // if (comment.trim().length > 3) {
      //   formData.append('text', comment);
      //   if (uploadedRecord) {
      //     formData.append('file', uploadedRecord);
      //   }
      //   addComment(
      //     {
      //       url: `records/${props.recordId}/comments`,
      //       method: 'POST',
      //       headers: {
      //         'Authorization': `Bearer ${auth.token}`
      //       },
      //       body: formData
      //     },
      //     data => {
      //       // console.log(data);
      //       setComment('');
      //       props.onAddComment();
      //     },
      //     err => {

      //     }
      //   )
      // } else {
      //   setCommentErr('comment');
      // }
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

  const start = () => {
    if (!isMp3Recording) {
      navigator.getUserMedia({ audio: true },
        () => {
          console.log('Permission Granted');
          setIsBlocked(false);
          Mp3Recorder
            .start()
            .then(() => {
              setIsMp3Recording(true);
              setRecordingTimeInterval(setInterval(() => {
                setRecordingMp3Time(prev => prev + 1);
              }, 1000));
            }).catch((e) => console.error(e));
        },
        () => {
          console.log('Permission Denied');
          setIsBlocked(true);
        },
      );
    }
    // if (isBlocked) {
    //   console.log('Permission Denied');
    // } else {
    // }
  };

  const stop = (e) => {
    e.stopPropagation()
    // e.stopPropgation()
    clearInterval(recordingTimeInterval);
    setRecordingMp3Time(0);
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        setBlobUrl(blobURL);
        setIsMp3Recording(false);
        setUploadedRecord(blob);
      }).catch((e) => console.log(e));
  };
  return (
    <Fragment>
      {isLoading && <Loader />}
      <form className="add-comment" onSubmit={addCommentHandler}>
        <div className="add-comment-input">
          <textarea disabled={!auth.isAuth} value={comment} onChange={onChangeComment} placeholder={useTranslate('input.placeholder.writeComment')}></textarea>
          <ErrorMessage message={commentErr} />
        </div>
        {/* {
          (!isRecording && recordingBlob) &&
          <div className="add-comment-audio">
            &nbsp;
                  <i className="fa-solid fa-trash-can"></i>
          </div>

        } */}
        <div className="add-comment-actions">
          {/* <AudioRecorder key={`record-${randomNum}`}
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
          /> */}
          {uploadedRecord && <i className="fa-solid fa-trash-can error-color fa-2xs" onClick={() => setUploadedRecord(undefined)}></i>}
          {
            auth?.loggedUser?.is_sheikh ?
              <button type="button" onClick={start} disabled={uploadedRecord}>
                {(!isMp3Recording && !uploadedRecord) && <span><i className="fa-solid fa-microphone"></i>&nbsp;<Translate id="button.addRecord" /></span>}
                {
                  isMp3Recording &&
                  <span>
                    <i className="fa-solid fa-circle-stop fa-2x" onClick={stop}></i>&nbsp;&nbsp;
                    <i className="fa-solid fa-circle-dot fa-beat error-color fa-2x"></i>&nbsp;&nbsp;
                    {/* {isPaused ?
                      <i className="fa-solid fa-circle-play" onClick={togglePauseResume}></i>
                      :
                      <i className="fa-solid fa-circle-pause" onClick={togglePauseResume}></i>
                    }
                    &nbsp; */}
                    {recordingMp3Time}
                  </span>
                }
                {(!isMp3Recording && uploadedRecord) && <audio id='record-audio' style={{ maxWidth: '100%' }} src={blobUrl} controls></audio>}
              </button> :
              ''
          }
          <button type="submit" disabled={!auth.isAuth || !(comment || uploadedRecord)}><Translate id="button.addComment" /></button>
        </div>
      </form>
    </Fragment>
  );
};

export default AddComment;
