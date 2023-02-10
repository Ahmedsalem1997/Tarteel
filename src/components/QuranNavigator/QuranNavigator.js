import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useHTTP from "../../hooks/use-http";
import Loader from "../Loader/Loader";

const QuranNavigator = (props) => {
    const [surahList, setSurahList] = useState([]);
    const [selectedSurah, setSelectedSurah] = useState(1);
    const { isLoading, error, sendRequest: getSurahList } = useHTTP();
    const lang = useSelector(state => {
        return state.lang.globalLang;
    });
    const onSurahChange = (surahNumber) => {
        props.onSurahChange(surahNumber);
        setSelectedSurah(surahNumber);
    }
    useEffect(() => {
        getSurahList({ baseUrl: 'http://api.alquran.cloud/v1/', url: "surah" }, surahObj => setSurahList(surahObj.data));
    }, [getSurahList]);
    return (
        <div className="quran-navigator">
            {isLoading && <Loader />}
            {
                error ?
                    error
                    :
                    surahList.map(surah => {
                        return (
                            <div key={surah.number} className={`quran-navigator-surah ${selectedSurah === surah.number && 'active'}`} onClick={() => onSurahChange(surah.number)}>
                                <span>{lang === 'ar' ? surah.number.toLocaleString('ar-EG') : surah.number}</span>
                                <p>{lang === 'ar' ? surah.name : surah.englishName}</p>
                            </div>
                        )
                    })
            }
        </div>
    )
}

export default QuranNavigator;