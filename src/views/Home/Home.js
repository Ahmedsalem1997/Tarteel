import { useState } from "react";
import { useSelector } from "react-redux";
import HomeSection from "../../components/HomeSection/HomeSection";
import IslamicContentHome from "../../components/IslamicContentHome/IslamicContentHome";
import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import Modal from "../../components/Modal/Modal";
import MyRecordsHome from "../../components/MyRecordsHome/MyRecordsHome";
import NotRegistered from "../../components/NotRegistered/NotRegistered";
import LatestRecords from "../../components/LatestRecords/LatestRecords";

const Home = () => {
  const isAuth = useSelector((state) => {
    return state.auth.isAuth;
  });
  const [isOpen, setIsOpen] = useState(false);
  return (
    <LayoutWrapper>
      <div className="container-fluid">
        {isAuth ? (
          <HomeSection header="myRecords.title" showAll="profile">
            <MyRecordsHome />
          </HomeSection>
        ) : (
          ""
        )}
        <button className="main-button" onClick={() => setIsOpen(true)}>
          open login
        </button>
        <HomeSection header="عنوان اخر">
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
