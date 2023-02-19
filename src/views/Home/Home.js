import HomeSection from "../../components/HomeSection/HomeSection";
import IslamicContentHome from "../../components/IslamicContentHome/IslamicContentHome";
import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import MyRecordsHome from "../../components/MyRecordsHome/MyRecordsHome";
import LatestRecords from "../../components/LatestRecords/LatestRecords";
import { getAuth } from "../../utils/Auth";

const Home = () => {
  const { isAuth, user } = getAuth();
  return (
    <LayoutWrapper>
      <div className="container-fluid">
        {isAuth && (
          <HomeSection header="records.myRecords" showAll={`users/${user.id}`}>
            <MyRecordsHome />
          </HomeSection>
        )}
        <HomeSection header="records.latestRecords">
          <LatestRecords />
        </HomeSection>

        <HomeSection header="islamicContent.title" showAll="islamic">
          <IslamicContentHome />
        </HomeSection>
      </div>
    </LayoutWrapper>
  );
};

export default Home;
