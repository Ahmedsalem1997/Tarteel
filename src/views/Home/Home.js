// import { Fragment } from "react";
// import Carousel from "../../components/Carousel/Carousel";
// import Footer from "../../components/Footer/Footer";
import HomeSection from "../../components/HomeSection/HomeSection";
// import HomeSubscribe from "../../components/HomeSubscribe/HomeSubscribe";
import IslamicContentHome from "../../components/IslamicContentHome/IslamicContentHome";
import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import MyRecordsHome from "../../components/MyRecordsHome/MyRecordsHome";
import Records from "../../components/Records/Records";

const Home = () => {
    return (
        <LayoutWrapper>
            <HomeSection header="myRecords.title" showAll="records">
                <MyRecordsHome />
            </HomeSection>

            <HomeSection header="عنوان اخر">
                <Records />
            </HomeSection>

            <HomeSection header="islamicContent.title" showAll="islamic">
                <IslamicContentHome />
            </HomeSection>
        </LayoutWrapper>

    )
}

export default Home;