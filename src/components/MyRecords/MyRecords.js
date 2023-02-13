import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useHTTP from "../../hooks/use-http";
import Records from "../Records/Records";

const MyRecords = () => {
    const { isLoading, error, sendRequest: getMyRecords } = useHTTP();
    const [myRecords, setMyRecords] = useState([]);
    const token = useSelector(state => {
        return state.auth.token;
    })
    useEffect(() => {
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
    }, [])
    return <Records records={myRecords} />
}

export default MyRecords;