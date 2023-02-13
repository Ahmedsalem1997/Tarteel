import { useEffect, useState } from "react";
import useHTTP from "../../hooks/use-http";
import Records from "../Records/Records";

const LatestRecords = () => {
    const [latestRecords, setLatestRecords] = useState([]);
    const { isLoading, error, sendRequest: getLatestRecords } = useHTTP();
    useEffect(() => {
        getLatestRecords(
            {
                url: 'records/latest',
                method: 'GET'
            },
            data => {
                setLatestRecords(data.data);
            })
    }, [])
    return (<Records records={latestRecords} />)
}

export default LatestRecords;