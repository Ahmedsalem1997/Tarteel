import NewRecord from "../SingleRecordCard/NewRecord/NewRecord";
import ExsitingRecord from "../SingleRecordCard/ExsitingRecord/ExsitingRecord";
import useHTTP from "./../../hooks/use-http";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const MyRecordsHome = () => {
  const { isLoading, error, sendRequest: getMyRecords } = useHTTP();
  const [userRedords, setUserRecords] = useState();
  const token = useSelector((state) => {
    return state.auth.token;
  });
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
