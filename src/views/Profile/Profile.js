import { Fragment } from "react";
import CarouselWrapper from "../../components/CarouselWrapper/CarouselWrapper";
import Footer from "../../components/Footer/Footer";
import HomeSubscribe from "../../components/HomeSubscribe/HomeSubscribe";
// import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import Records from "../../components/Records/Records";

const Profile = () => {
    return (
        <Fragment>
            <CarouselWrapper>
                <ProfileHeader />
            </CarouselWrapper>

            <div className="container-fluid">
                <Records />
            </div>
            <HomeSubscribe />
            <Footer />
        </Fragment>
    )
}

export default Profile;