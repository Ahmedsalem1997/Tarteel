import React, { Fragment, useEffect, useRef, useState } from 'react';
import Translate from '../../helpers/Translate/Translate';
import MicRecorder from 'mic-recorder-to-mp3';

const AudioRecord = (props) => {
    const [recorder, setRecorder] = useState(null);
    const [timer, setTimer] = useState(null);
    const [time, setTime] = useState(0);
    const [isRecording, setIsRecording] = useState(false);
    const [blobUrl, setBlobUrl] = useState('');
    const [uploadedRecord, setUploadedRecord] = useState(undefined);

    useEffect(() => {
        //Declares the recorder object and stores it in state
        setRecorder(new MicRecorder({ bitRate: 128 }));
    }, []);

    const startRecording = () => {
        // const audio = document.getElementById('record-audio');
        // console.log('started', audio.defaultPlaybackRate, audio.playbackRate);
        //start() returns a promise incase if audio is not blocked by browser
        if (!isRecording) {
            // navigator.getUserMedia({ audio: true },
            //     () => {
            //         console.log('Permission Granted');
            recorder.start().then(() => {
                setIsRecording(true);
            });
            //     },
            //     () => {
            //         console.log('Permission Denied');
            //     },
            // );
        }
    };

    const stopRecording = (e) => {
        e.stopPropagation();
        // console.log('stopped');
        recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
                const file = new File(buffer, 'recorded-voice.mp3', {
                    type: blob.type,
                    lastModified: Date.now()
                });
                // console.log(file);
                const newBlobUrl = URL.createObjectURL(file); //generates url from blob
                setBlobUrl(newBlobUrl); //refreshes the page
                setIsRecording(false);
                setUploadedRecord(file);
                props.onRecordFinished(file);
            })
            .catch();
    };

    useEffect(() => {
        props.onIsRecordingChange(isRecording)
        //start/stops timer depending on recording state
        if (isRecording) {
            startTimer();
        } else {
            stopTimer();
            // const audio = document.getElementById('record-audio');
            // if (audio) {
            //     audio.play();
            // }
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

            {
                (!isRecording && !uploadedRecord) &&
                <button type="button" onClick={startRecording} disabled={props.disabled}>
                    <span><i className="fa-solid fa-microphone"></i>&nbsp;<Translate id="button.addRecord" /></span>
                </button>
            }
            {
                (isRecording || uploadedRecord) &&
                <span className='d-flex justify-content-center align-items-center record-container'>
                    {
                        isRecording &&
                        <Fragment>
                            <i className="fa-solid fa-circle-stop cursor-pointer" onClick={stopRecording}></i>&nbsp;&nbsp;
                            <i className="fa-solid fa-circle-dot fa-beat error-color"></i>&nbsp;&nbsp;
                            <span className='fs-3'>{time}</span>
                        </Fragment>
                    }
                    {uploadedRecord && <i className="fa-solid fa-trash-can error-color fa-2x" onClick={() => { setUploadedRecord(undefined); props.onRecordFinished(undefined) }}></i>}
                    {(!isRecording && uploadedRecord) && <audio id='record-audio' style={{ maxWidth: '100%' }} src={blobUrl} controls></audio>}
                </span>
            }

        </Fragment>
    );
}

export default AudioRecord;