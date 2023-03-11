import HomeSection from "../../components/HomeSection/HomeSection";
import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";

const AboutUs = () => {
    return (
        <LayoutWrapper>
            <HomeSection header="footer.aboutUs">
                {/* <Records recordsUrl={`records/latest?records_type=${props.type}`} hideFollow={true} /> */}
            </HomeSection>
        </LayoutWrapper>
    )
}

export default AboutUs;