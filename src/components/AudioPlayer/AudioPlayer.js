import Wavesurfer from "wavesurfer.js";
import { useEffect, useRef } from "react";

const AudioPlayer = ({ url }) => {
    const waveform = useRef(null);
    const audio = require('../../assets/audios/test.mp3');

    useEffect(() => {
        // Check if wavesurfer object is already created.
        console.log('hellllooooo');
        if (!waveform.current) {
            // Create a wavesurfer object
            // More info about options here https://wavesurfer-js.org/docs/options.html
            waveform.current = Wavesurfer.create({
                container: "#waveform",
                waveColor: "#567FFF",
                barGap: 2,
                barWidth: 2,
                barRadius: 2,
                cursorWidth: 1,
                cursorColor: "#567FFF",
            });
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
    };

    return (
        <div>
            <div id="waveform" ></div>
            <button onClick={toggleAudio}>
                Play / Pause
            </button>
        </div>

    );
};

export default AudioPlayer;