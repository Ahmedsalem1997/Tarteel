import { useEffect, useState } from "react";
import HomeSection from "../../components/HomeSection/HomeSection";
import IslamicContentHome from "../../components/IslamicContentHome/IslamicContentHome";
import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import Modal from "../../components/Modal/Modal";
import MyRecordsHome from "../../components/MyRecordsHome/MyRecordsHome";
import Records from "../../components/Records/Records";
import NotRegistered from "../../components/NotRegistered/NotRegistered";
import useHTTP from "../../hooks/use-http";

const Home = () => {
    const [latestRecords, setLatestRecords] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const { isLoading, error, sendRequest: getLatestRecords } = useHTTP();

    const fetchRecords = () => {
        getLatestRecords(
            {
                url: 'records/latest',
                method: 'GET',
            },
            data => {
                setLatestRecords(data.data);
                console.log(data.data);
            }
        )
    }
    useEffect(() => {
        fetchRecords();
    }, [])
    return (
        <LayoutWrapper>
            <div className="container-fluid">

                <HomeSection header="myRecords.title" showAll="records">
                    <MyRecordsHome />
                </HomeSection>
                <button className="main-button" onClick={() => setIsOpen(true)}>open login</button>
                <HomeSection header="عنوان اخر">
                    <Records records={latestRecords} />
                </HomeSection>

                <HomeSection header="islamicContent.title" showAll="islamic">
                    <IslamicContentHome />
                </HomeSection>
            </div>
            {isOpen && <Modal><NotRegistered setIsOpen={setIsOpen} /></Modal>}
        </LayoutWrapper>


    )
}

export default Home;