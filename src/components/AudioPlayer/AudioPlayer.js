import Wavesurfer from "wavesurfer.js";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { audioActions } from "../../store/audio/audio";

const AudioPlayer = (props) => {
    const dispatch = useDispatch();
    const waveform = useRef(null);
    const audio = require('../../assets/audios/test.mp3');
    const [isPlaying, setIsPlaying] = useState(false);
    const globalLang = useSelector(state => {
        return state.lang.globalLang;
    });
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
                rtl: globalLang === 'ar' ? true : false
                // cursorColor: "#75b10e",
            });
            dispatch(audioActions.addAudio(waveform.current));
            // Load audio from a remote url.
            waveform.current.load(audio);
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
            if(audio.isPlaying()) {
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