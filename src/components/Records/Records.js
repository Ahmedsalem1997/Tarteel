import { Fragment, useEffect, useState } from "react";
import useHTTP from "../../hooks/use-http";
import { getAuth } from "../../utils/Auth";
import Loader from "../Loader/Loader";
import Record from "./Record/Record";

const Records = (props) => {
    const { isLoading, error, sendRequest } = useHTTP();
    const [records, setRecords] = useState([]);
    const { token } = getAuth();
    const getRecords = () => {
        sendRequest(
            {
                url: `records${props?.recordsUrl}`,
                method: 'GET',
                headers:
                {
                    'Authorization': `Bearer ${token || ''}`
                }
            },
            data => {
                setRecords(data.data);
            }
        )
    }
    useEffect(() => {
        getRecords();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Fragment>
            {isLoading && <Loader />}
            {records?.map((record) => {
                return <Record key={record.id} record={record} />
            })}
        </Fragment>
    )
}

export default Records;