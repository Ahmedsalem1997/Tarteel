import NewRecord from "../SingleRecordCard/NewRecord/NewRecord";
import ExsitingRecord from "../SingleRecordCard/ExsitingRecord/ExsitingRecord";
import useHTTP from "./../../hooks/use-http";
import { useEffect, useState } from "react";
import { getAuth } from "../../utils/Auth";

const MyRecordsHome = () => {
  const { isLoading, error, sendRequest: getMyRecords } = useHTTP();
  const [userRedords, setUserRecords] = useState();
  const { token } = getAuth();
  useEffect(() => {
    getMyRecords(
      {
        url: "records",
        headers: { 'Authorization': `Bearer ${token}` },
        method: "GET",
      },
      (data) => {
        setUserRecords(data.data);
        console.log(data);
      }
    );
  }, []);

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
