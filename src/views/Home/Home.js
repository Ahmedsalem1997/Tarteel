import { useState } from "react";
import HomeSection from "../../components/HomeSection/HomeSection";
import IslamicContentHome from "../../components/IslamicContentHome/IslamicContentHome";
import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import Modal from "../../components/Modal/Modal";
import MyRecordsHome from "../../components/MyRecordsHome/MyRecordsHome";
import Records from "../../components/Records/Records";
import NotRegistered from "../../components/NotRegistered/NotRegistered";

const Home = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <LayoutWrapper>
            <div className="container-fluid">

                <HomeSection header="myRecords.title" showAll="records">
                    <MyRecordsHome />
                </HomeSection>
                <button className="main-button" onClick={() => setIsOpen(true)}>open login</button>
                <HomeSection header="عنوان اخر">
                    <Records />
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