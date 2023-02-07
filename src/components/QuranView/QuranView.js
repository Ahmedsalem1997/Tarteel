import { Fragment, useEffect, useState } from "react";
import useHTTP from "../../hooks/use-http";

const QuranView = (props) => {
    const [surah, setSurah] = useState([]);
    const { isLoading, error, sendRequest: getSurah } = useHTTP();

    useEffect(() => {
        getSurah({ url: `surah/${props.selectedSurah}/quran-simple` }, surahObj => {
            setSurah(surahObj.data);
        });
    }, [props.selectedSurah]);
    return (
        <div className="quran-view">
            <div className="quran-view-surah">
                {surah?.ayahs?.map(ayah => {
                    return (
                        <Fragment key={ayah.number}>
                            {ayah.text}<span>{ayah.numberInSurah}</span>
                        </Fragment>
                    )
                })}
            </div>
        </div>
    )
}

export default QuranView;