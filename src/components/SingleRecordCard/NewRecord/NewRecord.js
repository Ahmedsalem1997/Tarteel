import SingleRecordCard from "../SingleRecordCard"

const NewRecord = (props) => {
    return (
        <SingleRecordCard>
            <div className="single-record-card-img"></div>
            <div className="single-record-card-name">
                <span>تسجيل جديد</span>
            </div>
        </SingleRecordCard>
    )
}

export default NewRecord;