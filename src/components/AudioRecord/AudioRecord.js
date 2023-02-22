// import React, { useState } from 'react';
// import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
// import Translate from '../../helpers/Translate/Translate';

// const AudioRecord = (props) => {
//     const [showRecording, setShowRecording] = useState(true);
//     const recorderControls = useAudioRecorder();
//     const randomId = Math.floor(Math.random()*1000);

//     const addAudioElement = (blob) => {
//         const url = URL.createObjectURL(blob);
//         const audio = document.createElement('audio');
//         audio.src = url;
//         audio.controls = true;
//         document.getElementById(`audio${randomId}`).appendChild(audio);
//         props.onRecordFinished(blob);
//         setShowRecording(false);
//     };

//     return (
//         <button type="button" className='audio-record' id={`audio${randomId}`}>
//             {props.showTitle ? !(!showRecording || recorderControls.isRecording) && <Translate id="button.startRecording" /> : ""}
//             {showRecording && <AudioRecorder
//                 onRecordingComplete={(blob) => addAudioElement(blob)}
//                 recorderControls={recorderControls}
//                 stopRecording={recorderControls.stopRecording}
//             />}
//         </button>
//     );
// }

// export default AudioRecord;