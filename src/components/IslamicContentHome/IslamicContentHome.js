import { useState, useEffect } from "react";
import ExsitingRecord from "../SingleRecordCard/ExsitingRecord/ExsitingRecord";
import useHTTP from "../../hooks/use-http";
import Loader from "../Loader/Loader";
import Translate from "../../helpers/Translate/Translate";

const IslamicContentHome = (props) => {
    const [items, setItems] = useState([]);
    const { isLoading, sendRequest: getCategories } = useHTTP();

    useEffect(() => {
        getCategories(
            {
                url: `content${props.id ? `?category_id=${props.id}` : '?per_page=6'}`,
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
            {items.length !== 0 ?
                items?.map((item) => (
                    <ExsitingRecord key={item.id} btn={true} record={item}></ExsitingRecord>
                ))
                :
                <h3 className="text-center"><Translate id="error.noContent"></Translate></h3>
            }
        </div>
    )
}

export default IslamicContentHome;