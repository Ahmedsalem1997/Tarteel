import NewRecord from "../SingleRecordCard/NewRecord/NewRecord";
import ExsitingRecord from "../SingleRecordCard/ExsitingRecord/ExsitingRecord";
import useHTTP from "./../../hooks/use-http";
import { useEffect, useState } from "react";
import { getAuth } from "../../utils/Auth";
import Loader from "../Loader/Loader";

const MyRecordsHome = () => {
  const { isLoading, error, sendRequest: getMyRecords } = useHTTP();
  const [userRecords, setUserRecords] = useState();
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
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="home-section-content">
      <NewRecord />
      {isLoading && <Loader />}
      {userRecords?.map((record) => {
        return <ExsitingRecord key={record.id} img={record.cover} name={record.title} media={record.file}></ExsitingRecord>;
      })}
    </div>
  );
};

export default MyRecordsHome;
