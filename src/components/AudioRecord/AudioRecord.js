import React, { useState } from 'react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import Translate from '../../helpers/Translate/Translate';

const AudioRecord = (props) => {
    const [record, setRecord] = useState(null);
    const recorderControls = useAudioRecorder();

    const addAudioElement = (blob) => {
        const url = URL.createObjectURL(blob);
        const audio = document.createElement('audio');
        audio.src = url;
        audio.controls = true;
        document.getElementById('audio').appendChild(audio);
        props.onRecordFinished(blob);
    };

    return (
        <button type="button" className='audio-record'>
            {!recorderControls.isRecording && <Translate id="button.startRecording" />}
            <AudioRecorder
                onRecordingComplete={(blob) => addAudioElement(blob)}
                recorderControls={recorderControls}
                stopRecording={recorderControls.stopRecording}
            />
        </button>
    );
}

export default AudioRecord;