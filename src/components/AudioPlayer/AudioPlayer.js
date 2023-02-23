import Wavesurfer from "wavesurfer.js";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuth } from "../../utils/Auth";
import { audioActions } from "../../store/audio/audio";
import { modalsActions } from '../../store/Modals/Modals';

const AudioPlayer = (props) => {
  const dispatch = useDispatch();
  const { isAuth } = getAuth();
  const waveform = useRef(null);
  const audio = require('../../assets/audios/test.mp3');
  const [isPlaying, setIsPlaying] = useState(false);
  const globalLang = useSelector(state => {
    return state.lang.globalLang;
  });
  // console.log(audio);
  // const audio = new Audio(props.audio);
  const audios = useSelector(state => state.audio.audioArr);
  useEffect(() => {
    // Check if wavesurfer object is already created.
    if (!waveform.current) {
      // Create a wavesurfer object
      // More info about options here https://wavesurfer-js.org/docs/options.html
      waveform.current = Wavesurfer.create({
        container: `#waveform-${props.id}`,
        waveColor: "#000",
        progressColor: '#ccc',
        barGap: 1,
        barWidth: 1,
        barRadius: 1,
        cursorWidth: 0,
        // splitChannels: true,
        height: 50,
        rtl: globalLang === 'ar' ? true : false,
        xhr: { mode: 'no-cors' },
        backend: 'MediaElement'
        // cursorColor: "#75b10e",
      });
      dispatch(audioActions.addAudio(waveform.current));
      // Load audio from a remote url.
      // let url = window.URL.revokeObjectURL(props?.audio);
      // console.log(url);
      // console.log(typeof(props.audio));
      // console.log(props.audio);
      // fetch(props.audio, { mode: 'no-cors' }).then(function (response) {
      //     //     // console.log(response);
      //     if (response.ok) {
        //         return response.blob();
        //     }
        //     throw new Error('Network response was not ok.');
        // }).then(function (blob) {
          //     //     // surfTheBlob(blob);
      //     waveform.current.loadBlob(blob);
      // }).catch(function (error) {
      //     console.log('There has been a problem with your fetch operation: ', error.message);
      // });
      /* To load a local audio file
      1. Read the audio file as a array buffer.
      2. Create a blob from the array buffer
      3. Load the audio using wavesurfer's loadBlob API
      */
    }
    waveform.current.load(props.audio);
    waveform.current.on("pause", () => {
      setIsPlaying(false);
    });
    waveform.current.on("play", () => {
      setIsPlaying(true);
    });
    return () => {
      waveform.current.pause();
      dispatch(audioActions.removeAudio(waveform.current));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleAudio = () => {
    //
    if (isAuth) {
      audios.forEach((audio) => {
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
    } else {
      dispatch(modalsActions.openLoginModal());
    }
  };

  return (
    <div className="audio-player">
      <button className="play-pause-btn" onClick={toggleAudio}>
        <i
          className={`fa-solid ${isPlaying ? "fa-pause" : "fa-play"} ${globalLang === "ar" ? "fa-flip-horizontal" : ""
            }`}
        ></i>
      </button>
      <div id={`waveform-${props.id}`} />
    </div>
  );
};

export default AudioPlayer;
