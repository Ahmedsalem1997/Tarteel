import { useEffect, useState } from "react";
import useHTTP from "../../hooks/use-http";
import { getAuth } from "../../utils/Auth";
import Records from "../Records/Records";

const LatestRecords = () => {
    const [latestRecords, setLatestRecords] = useState([]);
    const { isLoading, error, sendRequest: getLatestRecords } = useHTTP();
    const { token } = getAuth();
    useEffect(() => {
        getLatestRecords(
            {
                url: 'records/latest',
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            },
            data => {
                setLatestRecords(data.data);
            })
    }, [])
    return (<Records records={latestRecords} />)
}

export default LatestRecords;