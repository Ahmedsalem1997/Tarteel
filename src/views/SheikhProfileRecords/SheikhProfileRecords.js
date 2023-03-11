import { Fragment } from "react";
import CarouselWrapper from "../../components/CarouselWrapper/CarouselWrapper";
import Footer from "../../components/Footer/Footer";
import HomeSubscribe from "../../components/HomeSubscribe/HomeSubscribe";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import { useParams } from "react-router";
import SheikhRecords from "../../components/SheikhRecords/SheikhRecords";
import { getAuth } from "../../utils/Auth";

const SheikhProfileRecords = () => {
    let params = useParams();
    const { loggedUser } = getAuth();
    return (
        <Fragment>
            <CarouselWrapper>
                <ProfileHeader id={loggedUser.id} />
            </CarouselWrapper>

            <div className="container-fluid gx-2 gx-md-5">
                <SheikhRecords type={params.type} />
            </div>
            {/* <HomeSubscribe /> */}
            <Footer />
        </Fragment>
    )
}

export default SheikhProfileRecords;