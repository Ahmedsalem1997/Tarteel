import React from 'react';
import BlackBlock from '../BlackBlock/BlackBlock';
import ReactPlayer from 'react-player'


const MediaPlayer = () => {
    return ( 
        <BlackBlock>
            <ReactPlayer url='https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' controls/>
        </BlackBlock>
     );
}
 
export default MediaPlayer;