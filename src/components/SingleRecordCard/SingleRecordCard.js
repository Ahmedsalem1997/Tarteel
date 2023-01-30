const SingleRecordCard = (props) => {
    return (
        <div className="single-record-card">
            {props.children}
            {/* <button className="play-pause-btn"></button> */}
        </div>
    )
}

export default SingleRecordCard;