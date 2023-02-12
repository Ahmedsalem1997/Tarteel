import React from 'react';
import BlackBlock from '../BlackBlock/BlackBlock';
import ReactPlayer from 'react-player'


const MediaPlayer = (props) => {
    return (
        <BlackBlock width="75%" showClose={true} onClose={props.close}>
            <ReactPlayer url={props.media} controls />
        </BlackBlock>
    );
}

export default MediaPlayer;