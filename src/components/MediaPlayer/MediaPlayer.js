import React from 'react';
import ReactPlayer from 'react-player'
import { useDispatch, useSelector } from 'react-redux';
import { modalsActions } from '../../store/Modals/Modals';
import Modal from '../Modal/Modal';


const MediaPlayer = () => {
    const dispatch = useDispatch();
    const closeMediaModal = () => {
        dispatch(modalsActions.closeMediaModal())
    }
    const media = useSelector(state => state.modals.mediaToPlay);
    return (
        <Modal width="75%" showClose={true} onClose={closeMediaModal}>
            <ReactPlayer url={media} controls />
        </Modal >
    );
}

export default MediaPlayer;