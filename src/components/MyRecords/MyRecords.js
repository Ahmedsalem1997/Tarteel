
import Records from "../Records/Records";

const MyRecords = (props) => {
    return <Records hideFollow={true} recordsUrl={`users/${props.userId}/records`} />
}

export default MyRecords;