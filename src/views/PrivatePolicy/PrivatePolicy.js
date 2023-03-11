import HomeSection from "../../components/HomeSection/HomeSection";
import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";

const PrivatePolicy = () => {
    return (
        <LayoutWrapper>
            <HomeSection header="footer.privatePolicy">
                {/* <Records recordsUrl={`records/latest?records_type=${props.type}`} hideFollow={true} /> */}
            </HomeSection>
        </LayoutWrapper>
    )
}

export default PrivatePolicy;