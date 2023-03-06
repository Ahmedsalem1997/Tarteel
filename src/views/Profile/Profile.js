import { Fragment, useEffect, useState } from "react";
import CarouselWrapper from "../../components/CarouselWrapper/CarouselWrapper";
import Footer from "../../components/Footer/Footer";
import HomeSubscribe from "../../components/HomeSubscribe/HomeSubscribe";
import MyRecords from "../../components/MyRecords/MyRecords";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import { useLocation, useParams } from "react-router";
import { getAuth } from "../../utils/Auth";
import SheikhProfile from "../../components/SheikhProfile/SheikhProfile";

const Profile = () => {
    const location = useLocation();
    let params = useParams();
    const [userId, setUserId] = useState();
    useEffect(() => {
        if (location.pathname.includes('users')) {
            setUserId(params?.id);
        } if (location.pathname.includes('shekh')) {
            setUserId(loggedUser?.id);
        }
    }, [location])
    const { loggedUser } = getAuth();
    return (

        <Fragment>
            <CarouselWrapper>
                {userId && <ProfileHeader id={userId} />}
            </CarouselWrapper>

            <div className="container-fluid gx-2 gx-md-5">
                {
                    loggedUser?.is_sheikh ?
                        <SheikhProfile />
                        :
                        userId &&
                        <div className="user-records">
                            <MyRecords userId={userId} />
                        </div>

                }
            </div>
            <HomeSubscribe />
            <Footer />
        </Fragment>
    )
}

export default Profile;