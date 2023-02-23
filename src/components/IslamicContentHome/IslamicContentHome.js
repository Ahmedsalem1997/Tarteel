import { useState, useEffect } from "react";
import ExsitingRecord from "../SingleRecordCard/ExsitingRecord/ExsitingRecord";
import useHTTP from "../../hooks/use-http";
import Loader from "../Loader/Loader";

const IslamicContentHome = (props) => {
    const [items, setItems] = useState([]);
    const { isLoading, sendRequest: getCategories } = useHTTP();

    useEffect(() => {
        getCategories(
            {
                url: `content${props.id ? `?operator_id=${props.id}` : ''}`,
                method: 'GET'
            },
            data => {
                setItems(data.data);
            },
            err => {

            }
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="row gy-3">
            {isLoading && <Loader />}
            {items?.map((item) => (
                <ExsitingRecord key={item.id} btn={true} record={item}></ExsitingRecord>
            ))}
        </div>
    )
}

export default IslamicContentHome;