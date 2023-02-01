import { Fragment } from "react";
import Carousel from "../../components/Carousel/Carousel";
import Footer from "../../components/Footer/Footer";
import HomeSection from "../../components/HomeSection/HomeSection";
import HomeSubscribe from "../../components/HomeSubscribe/HomeSubscribe";
import IslamicContentHome from "../../components/IslamicContentHome/IslamicContentHome";
import MyRecordsHome from "../../components/MyRecordsHome/MyRecordsHome";
import Records from "../../components/Records/Records";

const Home = () => {
    return (
        <div className="container">
            <Fragment>
            <Carousel />

            <HomeSection header="تسجيلاتي" showAll="records">
                <MyRecordsHome />
            </HomeSection>
            
            <HomeSection header="عنوان اخر">
                <Records />
            </HomeSection>
            
            <HomeSection header="المحتوى الاسلامي" showAll="islamic">
                <IslamicContentHome />
            </HomeSection>

            <HomeSubscribe />

            <Footer />
        </Fragment>
        </div>
        
    )
}

export default Home;