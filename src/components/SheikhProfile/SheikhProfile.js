const SheikhProfile = () => {
    return (
        <div className="sheikh-profile">
            <div className="post">
                <div className="row">
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-5 col-6">
                        <div className="sheikh-records">
                            <h3 className="records-count">29</h3>
                            <h2 className="records-title">تسجيل جديد</h2>
                        </div>
                        <button className="main-button rounded-3 fs-2">عرض</button>
                    </div>
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-5 col-6">
                        <div className="sheikh-records">
                            <h3 className="records-count">35</h3>
                            <h2 className="records-title">تسجيلات تم تصحيحها</h2>
                        </div>
                        <button className="main-button rounded-3 fs-2">عرض</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SheikhProfile;