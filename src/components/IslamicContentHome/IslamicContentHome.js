import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ExsitingRecord from "../SingleRecordCard/ExsitingRecord/ExsitingRecord";
import useHTTP from "../../hooks/use-http";

const IslamicContentHome = () => {
    const lang = useSelector((state) => {
        return state.lang.globalLang;
    });

    const [items, setItems] = useState([]);
    const { sendRequest: getCategories } = useHTTP();

    useEffect(() => {
        getCategories(
            {
                url: `content`,
                method: 'GET'
            },
            data => {
                setItems(data.data);
            }
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="home-section-content">
            {items?.map((item) => (
                <ExsitingRecord key={item.id} btn={true} img={item.cover} name={lang === 'ar' ? item.title : item.title_en} media={item.file}></ExsitingRecord>
            ))}
        </div>
    )
}

export default IslamicContentHome;