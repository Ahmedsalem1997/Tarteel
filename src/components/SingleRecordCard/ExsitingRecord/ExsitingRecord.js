import { Translate } from "../../../helpers/Translate/Translate";
import SingleRecordCard from "../SingleRecordCard"
import { useDispatch } from "react-redux";
import { modalsActions } from "../../../store/Modals/Modals";

const ExsitingRecord = (props) => {
    const dispatch = useDispatch();
    const openMediaModal = () => {
        dispatch(modalsActions.openMediaModal(props.media));
    }
    return (
        <SingleRecordCard>
            <img className="single-record-card-img" src={props.img} alt=""></img>
            <div className="single-record-card-name" onClick={openMediaModal}>
                <span>{props.name}</span>
                {props.btn &&
                    <button className="trans-btn" onClick={openMediaModal}><Translate id="button.listen" /></button>}
            </div>
            {/* <button className="play-pause-btn"></button> */}
        </SingleRecordCard>
    )
}

export default ExsitingRecord;