import { Fragment, useEffect, useState } from "react";
import useHTTP from "../../hooks/use-http";
import { getAuth } from "../../utils/Auth";
import Loader from "../Loader/Loader";
import Record from "./Record/Record";

const Records = (props) => {
    const { isLoading, error, sendRequest, status } = useHTTP();
    const [err, setErr] = useState('');
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
                    'Authorization': token ? `Bearer ${token}` : ''
                }
            },
            data => {
                setRecords(data.data);
                // setTotalRecords(data.meta.total);
            },
            err => {
                setErr(err);
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
                return <Record hideFollow={props.hideFollow} showDelete={props.showDelete} key={record.id} record={record} onRecordChange={getRecords} />
            })}
            {/* {
                records.length < totalRecords &&
                <div className="show-more">
                    <button className="main-button" onClick={onShowMore}><Translate id="button.showMore" /></button>
                </div>
            } */}
            {/* <p>request err: {err.message}</p>
            <p>HTTP err: {error}</p>
            <p>HTTP status: {status}</p> */}
        </Fragment>
    )
}

export default Records;