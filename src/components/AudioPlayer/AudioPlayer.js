import Wavesurfer from "wavesurfer.js";
import { useEffect, useRef, useState } from "react";

const AudioPlayer = (props) => {
    const waveform = useRef(null);
    const audio = require('../../assets/audios/test.mp3');
    const [isPlaying, setIsPlaying] = useState(false);

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
                // cursorColor: "#75b10e",
            });
            console.log(waveform.current);
            // Load audio from a remote url.
            waveform.current.load(audio);
            /* To load a local audio file
                  1. Read the audio file as a array buffer.
                  2. Create a blob from the array buffer
                  3. Load the audio using wavesurfer's loadBlob API
           */
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleAudio = () => {
        // Check if the audio is already playing
        // if (waveform.current.isPlaying()) {
        //     waveform.current.pause();
        // } else {
        //     waveform.current.play();
        // }
        waveform.current.playPause();
        setIsPlaying((prev) => {
            return prev = !prev;
        })
    };

    return (
        <div className="audio-player">
            <button className="play-pause-btn" onClick={toggleAudio}>
                <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
            </button>
            <div id={`waveform-${props.id}`} />
        </div>

    );
};

export default AudioPlayer;