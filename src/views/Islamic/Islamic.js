import { Fragment } from "react";
import HomeSection from "../../components/HomeSection/HomeSection";
import IslamicSubSection from "../../components/IsalmicSubSection/IslamicSubSection";

const Islamic = () => {
    return (
        <Fragment>
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
        </Fragment>
    )
}

export default Islamic;