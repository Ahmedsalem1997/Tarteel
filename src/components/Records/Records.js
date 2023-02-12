import { Fragment } from "react";
import Record from "./Record/Record";

const Records = (props) => {
    return (
        <Fragment>
            {props?.records?.map((record) => {
                return <Record key={record.id} record={record}></Record>
            })}
        </Fragment>
    )
}

export default Records;