import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHTTP from "../../hooks/use-http";
import { getAuth } from "../../utils/Auth";
import Records from "../Records/Records";
// import { recordsActions } from "../../store/Records/Records";
// let isTrue = true;
const LatestRecords = () => {
    const [latestRecords, setLatestRecords] = useState([]);
    const { isLoading, error, sendRequest: getLatestRecords } = useHTTP();
    const { token } = getAuth();
    // const dispatch = useDispatch();
    const recordsChange = useSelector(state => state.records.latestRecords);
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
                // if(isTrue) {
                //     dispatch(recordsActions.setRecords(data.data));
                //     isTrue = false;
                // }
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recordsChange])
    return (<Records records={latestRecords} />)
}

export default LatestRecords;