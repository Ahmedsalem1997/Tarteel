import { Fragment } from "react";
import CarouselWrapper from "../../components/CarouselWrapper/CarouselWrapper";
import Footer from "../../components/Footer/Footer";
import HomeSubscribe from "../../components/HomeSubscribe/HomeSubscribe";
import MyRecords from "../../components/MyRecords/MyRecords";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import { useParams } from "react-router";
import { getAuth } from "../../utils/Auth";
import SheikhProfile from "../../components/SheikhProfile/SheikhProfile";

const Profile = () => {
    let params = useParams();
    const { loggedUser } = getAuth();
    return (
        <Fragment>
            <CarouselWrapper>
                <ProfileHeader id={params.id} />
            </CarouselWrapper>

            <div className="container-fluid gx-2 gx-md-5">
                {
                    loggedUser.is_sheikh ?
                        <SheikhProfile />
                        :
                        <div className="user-records">
                            <MyRecords userId={params.id} />
                        </div>
                }
            </div>
            <HomeSubscribe />
            <Footer />
        </Fragment>
    )
}

export default Profile;