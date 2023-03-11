
import Records from "../Records/Records";

const MyRecords = (props) => {
    return <Records hideFollow={true} showDelete={true} recordsUrl={`users/${props.userId}/records`} />
}

export default MyRecords;