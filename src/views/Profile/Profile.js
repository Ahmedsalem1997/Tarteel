import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CarouselWrapper from "../../components/CarouselWrapper/CarouselWrapper";
import Footer from "../../components/Footer/Footer";
import HomeSubscribe from "../../components/HomeSubscribe/HomeSubscribe";
// import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import Records from "../../components/Records/Records";
import useHTTP from "../../hooks/use-http";

const Profile = () => {
    const [myRecords, setMyRecords] = useState([]);
    const { isLoading, error, sendRequest: getMyRecords } = useHTTP();
    const token = useSelector(state => {
        return state.auth.token;
    })
    useEffect(() => {
        getMyRecords(
            {
                url: 'records',
                method: 'GET',
                headers:
                {
                    'Authorization': `Bearer 1|qi5xebKopkrjOKvWO7m2uBrKxicBbI6UWql19gKH`
                }
            },
            data => {
                setMyRecords(data.data);
            }
        )
    }, [])
    return (
        <Fragment>
            <CarouselWrapper>
                <ProfileHeader />
            </CarouselWrapper>

            <div className="container-fluid">
                <Records records={myRecords} />
            </div>
            <HomeSubscribe />
            <Footer />
        </Fragment>
    )
}

export default Profile;