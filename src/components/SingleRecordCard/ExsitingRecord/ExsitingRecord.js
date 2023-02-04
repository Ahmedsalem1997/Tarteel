import { Translate } from "../../../helpers/Translate/Translate";
import SingleRecordCard from "../SingleRecordCard"

const ExsitingRecord = (props) => {
    return (
        <SingleRecordCard>
            <img className="single-record-card-img" src={props.img} alt=""></img>
            <div className="single-record-card-name">
                <span>{props.name}</span>
                {props.btn &&
                    <button className="trans-btn"><Translate id="button.listen" /></button>}
            </div>
            {/* <button className="play-pause-btn"></button> */}
        </SingleRecordCard>
    )
}

export default ExsitingRecord;