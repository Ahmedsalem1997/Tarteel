import { useEffect, useState } from "react";
import useHTTP from "../../hooks/use-http";
import { getAuth } from "../../utils/Auth";
import Records from "../Records/Records";

const MyRecords = () => {
    const { isLoading, error, sendRequest: getMyRecords } = useHTTP();
    const [myRecords, setMyRecords] = useState([]);
    const { token } = getAuth();
    useEffect(() => {
        console.log('tokeeeen', token);
        getMyRecords(
            {
                url: 'records',
                method: 'GET',
                headers:
                {
                    'Authorization': `Bearer ${token}`
                }
            },
            data => {
                setMyRecords(data.data);
            }
        )
    }, []);
    return <Records records={myRecords} />
}

export default MyRecords;