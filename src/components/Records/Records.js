import { Fragment, useEffect, useState } from "react";
import useHTTP from "../../hooks/use-http";
import { getAuth } from "../../utils/Auth";
import Loader from "../Loader/Loader";
import Record from "./Record/Record";

const Records = (props) => {
    const { isLoading, error, sendRequest } = useHTTP();
    const [records, setRecords] = useState([]);
    const { token } = getAuth();
    // const [page, setPage] = useState(1);
    // const [perPage, setPerPage] = useState(5);
    // const [totalRecords, setTotalRecords] = useState(0);
    const getRecords = () => {
        sendRequest(
            {
                url: `${props?.recordsUrl}`,
                method: 'GET',
                headers:
                {
                    'Authorization': `Bearer ${token || ''}`
                }
            },
            data => {
                setRecords(data.data);
                // setTotalRecords(data.meta.total);
            },
            err => {

            }
        )
    }
    // const onShowMore = () => {
    //     setPage(prev => prev + 1);
    //     getRecords(records);
    // }
    useEffect(() => {
        getRecords();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Fragment>
            {isLoading && <Loader />}
            {records?.map((record) => {
                return <Record hideFollow={props.hideFollow} key={record.id} record={record} onRecordChange={getRecords} />
            })}
            {/* {
                records.length < totalRecords &&
                <div className="show-more">
                    <button className="main-button" onClick={onShowMore}><Translate id="button.showMore" /></button>
                </div>
            } */}
        </Fragment>
    )
}

export default Records;