import SingleRecordCard from "../SingleRecordCard"
import Translate from '../../../helpers/Translate/Translate';
const NewRecord = (props) => {
    return (
        <SingleRecordCard>
            <div className="single-record-card-img"></div>
            <div className="single-record-card-name">
                <span><Translate id="button.register"/></span>
            </div>
        </SingleRecordCard>
    )
}

export default NewRecord;