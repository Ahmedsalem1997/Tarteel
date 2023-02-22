import HomeSection from "../../components/HomeSection/HomeSection";
import IslamicContentHome from "../../components/IslamicContentHome/IslamicContentHome";
import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import MyRecordsHome from "../../components/MyRecordsHome/MyRecordsHome";
import LatestRecords from "../../components/LatestRecords/LatestRecords";
import { getAuth } from "../../utils/Auth";

const Home = () => {
  const { isAuth, loggedUser } = getAuth();
  return (
    <LayoutWrapper>
      <div className="container-fluid gx-2 gx-md-5">
        {isAuth && (
          <HomeSection header="records.myRecords" showAll={`/users/${loggedUser.id}`}>
            <MyRecordsHome />
          </HomeSection>
        )}
        <HomeSection header="records.latestRecords">
          <LatestRecords />
        </HomeSection>

        <HomeSection header="islamicContent.title" showAll="/islamic">
          <IslamicContentHome />
        </HomeSection>
      </div>
    </LayoutWrapper>
  );
};

export default Home;
