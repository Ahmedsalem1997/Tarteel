// import { Fragment } from "react";
import HomeSection from "../../components/HomeSection/HomeSection";
import IslamicSubSection from "../../components/IsalmicSubSection/IslamicSubSection";
import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";

const Islamic = () => {
    return (
        <LayoutWrapper>
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
        </LayoutWrapper>
    )
}

export default Islamic;