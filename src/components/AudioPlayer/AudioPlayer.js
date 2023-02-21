import Wavesurfer from "wavesurfer.js";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { audioActions } from "../../store/audio/audio";

const AudioPlayer = (props) => {
    const dispatch = useDispatch();
    // const audio = require('../../assets/audios/test.mp3');
    // console.log(audio);
    const waveform = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const globalLang = useSelector(state => {
        return state.lang.globalLang;
    });
    // const audio = new Audio(props.audio);
    const audios = useSelector(state => state.audio.audioArr);
    useEffect(() => {
        // Check if wavesurfer object is already created.
        if (!waveform.current) {
            // Create a wavesurfer object
            // More info about options here https://wavesurfer-js.org/docs/options.html
            waveform.current = Wavesurfer.create({
                container: `#waveform-${props.id}`,
                waveColor: "#75b10e",
                barGap: 1,
                barWidth: 1,
                barRadius: 1,
                cursorWidth: 0,
                height: 50,
                backend: 'MediaElement',
                xhr: { mode: 'no-cors' },
                rtl: globalLang === 'ar' ? true : false,
                // cursorColor: "#75b10e",
            });
            // waveform.current.setVolume(1);
            dispatch(audioActions.addAudio(waveform.current));
            // Load audio from a remote url.
            // let url = window.URL.revokeObjectURL(props?.audio);
            // console.log(url);
            // console.log(typeof(props.audio));
            // console.log(props.audio);
            // new File()

            // let request = new XMLHttpRequest();
            // request.open('GET', props.audio, true);
            // request.responseType = 'blob';
            // request.mode = 'no-cors';
            // request.onload = function () {
            //     var reader = new FileReader();
            //     reader.readAsDataURL(request.response);
            //     reader.onload = function (e) {
            //         console.log('DataURL:', e.target.result);
            //     };
            // };
            // request.send();

            // fetch('../../assets/audios/test.mp3', { mode: 'no-cors' }).then(function (response) {
            //     // console.log(response.url);
            //     //     // console.log(response);
            //     if (response.ok) {
            //         return response.blob();
            //     }
            //     throw new Error('Network response was not ok.');
            // }).then(function (blob) {
            //     blob.type = 'audio/mp3'
            //     waveform.current.loadBlob(blob);
            //     //     // surfTheBlob(blob);
            // }).catch(function (error) {
            //     console.log('There has been a problem with your fetch operation: ', error.message);
            // });

            // const audio = new Audio('../../assets/audios/test.mp3')
            // console.log(audio);
            // waveform.current.loadBlob(props.audio);
            // const ctx = new AudioContext();
            // // let audio;
            waveform.current.load(props.audio);
            // fetch(props.audio, { mode: 'no-cors' })
            //     .then(data => data.arrayBuffer())
            //     .then(arrayBuffer => {
            //         let blob = new Blob([arrayBuffer]);
            //         // const url = URL.createObjectURL(blob)
            //         // const url = URL.createObjectURL(blob);
            //         waveform.current.load(blob);
            //         // document.getElementById("recording").src = url;
            //         // URL.revokeObjectURL(url);
            //     })
            // .then(decodedArray => decodedArray.blob())
            // .then(blobAudio => console.log(blobAudio));
            /* To load a local audio file
            1. Read the audio file as a array buffer.
            2. Create a blob from the array buffer
            3. Load the audio using wavesurfer's loadBlob API
            */
        }
        waveform.current.on("pause", () => {
            setIsPlaying(false);
        });
        waveform.current.on("play", () => {
            setIsPlaying(true);
        });
        return (() => {
            waveform.current.pause();
            dispatch(audioActions.removeAudio(waveform.current));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleAudio = () => {
        audios.forEach(audio => {
            if (audio.isPlaying()) {
                audio.pause();
            }
        });
        // Check if the audio is already playing
        if (isPlaying) {
            waveform.current.pause();
            setIsPlaying(false);
        } else {
            waveform.current.play();
            setIsPlaying(true);
        }
    };

    return (
        <div className="audio-player">
            <button className="play-pause-btn" onClick={toggleAudio}>
                <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'} ${globalLang === 'ar' ? 'fa-flip-horizontal' : ''}`}></i>
            </button>
            <div id={`waveform-${props.id}`} />
        </div>

    );
};

export default AudioPlayer;