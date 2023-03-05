import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Translate from '../../helpers/Translate/Translate';
import useHTTP from '../../hooks/use-http';
import { getAuth } from "../../utils/Auth";
import Loader from '../Loader/Loader';
import SheikhRecords from '../SheikhRecords/SheikhRecords';

const SheikhProfile = () => {
    const { isLoading, error, sendRequest } = useHTTP();
    const [recordsCount, setRecordsCount] = useState({});
    const [selectedRecords, setSelectedRecords] = useState('');
    const { token } = getAuth();

    useEffect(() => {
        getSheikhRecordsCount();
    }, [])
    const getSheikhRecordsCount = () => {
        sendRequest({
            url: 'sheikh/dashboard',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        },
            data => {
                setRecordsCount(data.data);
            },
            err => {

            }
        )
    }
    return (
        <Fragment>
            {isLoading && <Loader />}
            <div className="sheikh-profile">
                <div className="post">
                    <div className="row">
                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-5 col-6">
                            <div className="sheikh-records">
                                <h3 className="records-count">{recordsCount?.pending_records_count}</h3>
                                <h2 className="records-title"><Translate id="records.newRecord" /></h2>
                            </div>
                            <Link to="/sheikh-records/pending"><button className="main-button rounded-3 fs-2"><Translate id="button.show" /></button></Link>
                        </div>
                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-5 col-6">
                            <div className="sheikh-records">
                                <h3 className="records-count">{recordsCount?.commented_records_count}</h3>
                                <h2 className="records-title"><Translate id="records.oldRecords" /></h2>
                            </div>
                            <Link to="/sheikh-records/commented"><button className="main-button rounded-3 fs-2"><Translate id="button.show" /></button></Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* {selectedRecords && <SheikhRecords type={selectedRecords} />} */}
        </Fragment>
    )
}

export default SheikhProfile;