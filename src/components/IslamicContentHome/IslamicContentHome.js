import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ExsitingRecord from "../SingleRecordCard/ExsitingRecord/ExsitingRecord";
import useHTTP from "../../hooks/use-http";
import Loader from "../Loader/Loader";

const IslamicContentHome = () => {
    const lang = useSelector((state) => {
        return state.lang.globalLang;
    });

    const [items, setItems] = useState([]);
    const { isLoading, sendRequest: getCategories } = useHTTP();

    useEffect(() => {
        getCategories(
            {
                url: `content`,
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
        <div className="home-section-content">
            {isLoading && <Loader />}
            {items?.map((item) => (
                <ExsitingRecord key={item.id} btn={true} record={item}></ExsitingRecord>
            ))}
        </div>
    )
}

export default IslamicContentHome;