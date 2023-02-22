import { Fragment } from "react";
import CarouselWrapper from "../../components/CarouselWrapper/CarouselWrapper";
import Footer from "../../components/Footer/Footer";
import HomeSubscribe from "../../components/HomeSubscribe/HomeSubscribe";
import MyRecords from "../../components/MyRecords/MyRecords";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import { useParams } from "react-router";

const Profile = () => {
    let params = useParams();

    return (
        <Fragment>
            <CarouselWrapper>
                <ProfileHeader id={params.id} />
            </CarouselWrapper>

            <div className="container-fluid gx-1 gx-md-5">
                <div className="user-records">
                    <MyRecords userId={params.id} />
                </div>
            </div>
            <HomeSubscribe />
            <Footer />
        </Fragment>
    )
}

export default Profile;