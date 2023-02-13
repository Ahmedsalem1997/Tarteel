import { Fragment } from "react";
import CarouselWrapper from "../../components/CarouselWrapper/CarouselWrapper";
import Footer from "../../components/Footer/Footer";
import HomeSubscribe from "../../components/HomeSubscribe/HomeSubscribe";
import MyRecords from "../../components/MyRecords/MyRecords";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";

const Profile = () => {
    
    
    return (
        <Fragment>
            <CarouselWrapper>
                <ProfileHeader />
            </CarouselWrapper>

            <div className="container-fluid">
                <MyRecords />
            </div>
            <HomeSubscribe />
            <Footer />
        </Fragment>
    )
}

export default Profile;