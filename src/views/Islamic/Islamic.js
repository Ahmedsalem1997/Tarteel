// import { Fragment } from "react";
import HomeSection from "../../components/HomeSection/HomeSection";
import IslamicSubSection from "../../components/IsalmicSubSection/IslamicSubSection";
import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";

const Islamic = () => {
    return (
        <LayoutWrapper>
            <div className="container-fluid">
                <HomeSection header="المحتوى الاسلامي" showAll="/">
                    <IslamicSubSection />
                </HomeSection>
                <HomeSection header="المحتوى الاسلامي" showAll="/">
                    <IslamicSubSection />
                </HomeSection>
                <HomeSection header="المحتوى الاسلامي" showAll="/">
                    <IslamicSubSection />
                </HomeSection>
                <HomeSection header="المحتوى الاسلامي" showAll="/">
                    <IslamicSubSection />
                </HomeSection>
            </div>
        </LayoutWrapper>
    )
}

export default Islamic;