import React, { Fragment, useEffect, useRef, useState } from 'react';
import Translate from '../../helpers/Translate/Translate';
import MicRecorder from 'mic-recorder-to-mp3';

const AudioRecord = (props) => {
    const recorder = useRef(null);
    const [timer, setTimer] = useState(null);
    const [time, setTime] = useState(0);
    const [isRecording, setIsRecording] = useState(false);
    const [blobUrl, setBlobUrl] = useState('');
    const [uploadedRecord, setUploadedRecord] = useState(undefined);

    useEffect(() => {
        //Declares the recorder object and stores it in ref
        recorder.current = new MicRecorder({ bitRate: 128 });
    }, []);

    const startRecording = () => {
        //start() returns a promise incase if audio is not blocked by browser
        recorder.current.start().then(() => {
            setIsRecording(true);
        });
    };

    const stopRecording = (e) => {
        e.stopPropagation()
        recorder.current
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
                const newBlobUrl = URL.createObjectURL(blob); //generates url from blob
                setBlobUrl(newBlobUrl); //refreshes the page
                setIsRecording(false);
                setUploadedRecord(blob);
                props.onRecordFinished(blob);
            })
            .catch((e) => console.log(e));
    };

    useEffect(() => {
        props.onIsRecordingChange(isRecording)
        //start/stops timer depending on recording state
        if (isRecording) {
            startTimer();
        } else {
            stopTimer();
        }
    }, [isRecording]);

    const startTimer = () => {
        //sets interval that updates time on UI every second
        setTime(0);
        setTimer(setInterval(() => {
            setTime(prev => prev + 1);
            // time = time + 1;
            // displayTime.current.innerText = time.current;
            //Displays time by updating the DOM directly
        }, 1000));
    };

    const stopTimer = () => {
        clearInterval(timer);
    };
    return (
        <Fragment>

            {uploadedRecord && <i className="fa-solid fa-trash-can error-color fa-2x" onClick={() => { setUploadedRecord(undefined); props.onRecordFinished(undefined) }}></i>}
            {
                <button type="button" onClick={startRecording} disabled={uploadedRecord || props.disabled}>
                    {(!isRecording && !uploadedRecord) && <span><i className="fa-solid fa-microphone"></i>&nbsp;<Translate id="button.addRecord" /></span>}
                    {
                        isRecording &&
                        <span className='d-flex justify-content-center align-items-center'>
                            <i className="fa-solid fa-circle-stop" onClick={stopRecording}></i>&nbsp;&nbsp;
                            <i className="fa-solid fa-circle-dot fa-beat error-color"></i>&nbsp;&nbsp;
                            <span className='fs-3'>{time}</span>
                        </span>
                    }
                    {(!isRecording && uploadedRecord) && <audio id='record-audio' style={{ maxWidth: '100%' }} src={blobUrl} controls></audio>}
                </button>
            }
        </Fragment>
    );
}

export default AudioRecord;