import NewRecord from "../SingleRecordCard/NewRecord/NewRecord";
import ExsitingRecord from "../SingleRecordCard/ExsitingRecord/ExsitingRecord";
import useHTTP from "./../../hooks/use-http";
import { useEffect, useState } from "react";
import { getAuth } from "../../utils/Auth";
import { useDispatch, useSelector } from "react-redux";
// import { recordsActions } from "../../store/Records/Records";
// let isTrue = true;
const MyRecordsHome = () => {
  const { isLoading, error, sendRequest: getMyRecords } = useHTTP();
  const [userRedords, setUserRecords] = useState();
  const { token } = getAuth();
  // const dispatch = useDispatch();
  const recordsChange = useSelector(state => state.records.myRecordsHome);
  useEffect(() => {
    getMyRecords(
      {
        url: "records",
        headers: { 'Authorization': `Bearer ${token}` },
        method: "GET",
      },
      (data) => {
        setUserRecords(data.data);
        // if (isTrue) {
        //   dispatch(recordsActions.setRecords(data.data));
        //   isTrue = false;
        // }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordsChange]);

  return (
    <div className="home-section-content">
      <NewRecord />
      {userRedords?.map((record) => {
        return <ExsitingRecord key={record.id} img={record.cover} name={record.title} media={record.file}></ExsitingRecord>;
      })}
    </div>
  );
};

export default MyRecordsHome;
