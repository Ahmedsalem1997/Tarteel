
import Records from "../Records/Records";

const MyRecords = (props) => {
    return <Records recordsUrl={`users/${props.userId}/records`} />
}

export default MyRecords;