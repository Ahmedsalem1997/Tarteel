import { useState } from "react";
import HomeSection from "../../components/HomeSection/HomeSection";
import IslamicContentHome from "../../components/IslamicContentHome/IslamicContentHome";
import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import Modal from "../../components/Modal/Modal";
import MyRecordsHome from "../../components/MyRecordsHome/MyRecordsHome";
import NotRegistered from "../../components/NotRegistered/NotRegistered";
import LatestRecords from "../../components/LatestRecords/LatestRecords";
import { getAuth } from "../../utils/Auth";

const Home = () => {
  const { isAuth } = getAuth();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <LayoutWrapper>
      <div className="container-fluid">
        {isAuth && (
          <HomeSection header="records.myRecords" showAll="profile">
            <MyRecordsHome />
          </HomeSection>
        )}
        <button className="main-button" onClick={() => setIsOpen(true)}>
          open login
        </button>
        <HomeSection header="records.latestRecords">
          <LatestRecords />
        </HomeSection>

        <HomeSection header="islamicContent.title" showAll="islamic">
          <IslamicContentHome />
        </HomeSection>
      </div>
      {isOpen && (
        <Modal>
          <NotRegistered setIsOpen={setIsOpen} />
        </Modal>
      )}
    </LayoutWrapper>
  );
};

export default Home;
