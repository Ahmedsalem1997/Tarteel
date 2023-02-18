import { Fragment, useEffect, useState } from "react";
import useHTTP from "../../hooks/use-http";
import { getAuth } from "../../utils/Auth";
import Loader from "../Loader/Loader";
import Record from "./Record/Record";

const Records = (props) => {
    const { isLoading, error, sendRequest } = useHTTP();
    const [records, setRecords] = useState([]);
    const { token } = getAuth();
    const [page, setPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const getRecords = () => {
        sendRequest(
            {
                url: `records${props?.recordsUrl}?page=${page}&per_page=10`,
                method: 'GET',
                headers:
                {
                    'Authorization': `Bearer ${token || ''}`
                }
            },
            data => {
                setRecords(prev => [...prev, ...data.data]);
                setTotalRecords(data.meta.total);
            },
            err => {

            }
        )
    }
    const onShowMore = () => {
        setPage(prev => prev + 1);
    }
    useEffect(() => {
        getRecords();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);
    return (
        <Fragment>
            {isLoading && <Loader />}
            {records?.map((record) => {
                return <Record key={record.id} record={record} />
            })}
            <div className="show-more">
                <button disabled={records.length >= totalRecords} className="main-button" onClick={onShowMore}>show more</button>
            </div>
        </Fragment>
    )
}

export default Records;