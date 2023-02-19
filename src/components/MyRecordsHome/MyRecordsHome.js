import NewRecord from "../SingleRecordCard/NewRecord/NewRecord";
import ExsitingRecord from "../SingleRecordCard/ExsitingRecord/ExsitingRecord";
import useHTTP from "./../../hooks/use-http";
import { useEffect, useState } from "react";
import { getAuth } from "../../utils/Auth";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";

const MyRecordsHome = () => {
  const { isLoading, error, sendRequest: getMyRecords } = useHTTP();
  const [userRecords, setUserRecords] = useState();
  const { token } = getAuth();
  const addNewRecordModalOpen = useSelector(state => state.modals.addNewRecordModal);

  useEffect(() => {
    if (!addNewRecordModalOpen) {
      getMyRecords(
        {
          url: "records?per_page=6&page=1",
          headers: { 'Authorization': `Bearer ${token}` },
          method: "GET",
        },
        (data) => {
          setUserRecords(data.data);
        },
        err => {

        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addNewRecordModalOpen]);

  return (
    <div className="home-section-content">
      <NewRecord />
      {isLoading && <Loader />}
      {userRecords?.map((record) => {
        return <ExsitingRecord record={record} key={record.id}></ExsitingRecord>;
      })}
    </div>
  );
};

export default MyRecordsHome;
