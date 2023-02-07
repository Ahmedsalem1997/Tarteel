import { useEffect, useState } from "react";
import useHTTP from "../../hooks/use-http";

const QuranNavigator = (props) => {
    const [surahList, setSurahList] = useState([]);
    const [selectedSurah, setSelectedSurah] = useState(1);
    const {isLoading, error, sendRequest: getSurahList} = useHTTP();

    const onSurahChange = (surahNumber) => {
        props.onSurahChange(surahNumber);
        setSelectedSurah(surahNumber);
    }
    useEffect(() => {
        getSurahList({url: "surah"}, surahObj => setSurahList(surahObj.data));
    }, [getSurahList]);
    return (
        <div className="quran-navigator">
            {surahList.map(surah => {
                return (
                    <div key={surah.number} className={`quran-navigator-surah ${selectedSurah === surah.number? 'active': ''}`} onClick={() => onSurahChange(surah.number)}>
                        <span>{surah.number}</span>
                        <span>{surah.name}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default QuranNavigator;