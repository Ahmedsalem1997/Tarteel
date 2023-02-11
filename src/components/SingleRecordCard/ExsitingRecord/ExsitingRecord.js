import { Translate } from "../../../helpers/Translate/Translate";
import SingleRecordCard from "../SingleRecordCard"
import { useState } from 'react';
import Modal from "../../Modal/Modal";
import MediaPlayer from './../../MediaPlayer/MediaPlayer';

const ExsitingRecord = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <SingleRecordCard>
            <img className="single-record-card-img" src={props.img} alt=""></img>
            <div className="single-record-card-name">
                <span>{props.name}</span>
                {props.btn &&
                    <button className="trans-btn" onClick={() => setIsOpen(true)}><Translate id="button.listen" /></button>}
            </div>
            {/* <button className="play-pause-btn"></button> */}
            {isOpen && <Modal><MediaPlayer /></Modal>}
        </SingleRecordCard>
    )
}

export default ExsitingRecord;