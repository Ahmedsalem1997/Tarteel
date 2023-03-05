import HomeSection from "../HomeSection/HomeSection";
import Records from "../Records/Records";
const SheikhRecords = (props) => {
    return (
        <HomeSection header={props.type === 'pending' ? "records.newRecord" : "records.oldRecords"}>
            <Records recordsUrl={`records/latest?records_type=${props.type}`} />
        </HomeSection>
    )
}

export default SheikhRecords;