// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import useHTTP from "../../hooks/use-http";
// import { recordsActions } from "../../store/Records/Records";
// import { getAuth } from "../../utils/Auth";
import Records from "../Records/Records";

const MyRecords = () => {
    // const { isLoading, error, sendRequest: getMyRecords } = useHTTP();
    // const [myRecords, setMyRecords] = useState([]);
    // const { token } = getAuth();
    // // const dispatch = useDispatch();
    // const recordsChange = useSelector(state => state.records.myRecords);
    // useEffect(() => {
    //     console.log('tokeeeen', token);
    //     getMyRecords(
    //         {
    //             url: 'records',
    //             method: 'GET',
    //             headers:
    //             {
    //                 'Authorization': `Bearer ${token}`
    //             }
    //         },
    //         data => {
    //             setMyRecords(data.data);
    //             // dispatch(recordsActions.setRecords(data.data));
    //         }
    //     )
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [recordsChange]);
    return <Records recordsUrl='' />
}

export default MyRecords;