const SingleRecordCard = (props) => {
    return (
        <div className="col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6 col-6">

            <div className="single-record-card">
                {props.children}
            </div>
        </div>
    )
}

export default SingleRecordCard;