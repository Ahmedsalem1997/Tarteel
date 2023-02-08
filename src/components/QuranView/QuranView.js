import { Fragment, useEffect, useState } from "react";
import useHTTP from "../../hooks/use-http";
import { useSelector } from "react-redux";
import Translate from "../../helpers/Translate/Translate";
import Loader from "../Loader/Loader";

const QuranView = (props) => {
    const [surah, setSurah] = useState([]);
    const { isLoading, error, sendRequest: getSurah } = useHTTP();
    const lang = useSelector(state => {
        return state.lang.globalLang;
    });
    useEffect(() => {
        const surahUrl = lang === 'ar' ? `${props.selectedSurah}/quran-simple` : `${props.selectedSurah}/en.ahmedali`;
        getSurah({ url: `surah/${surahUrl}` }, surahObj => {
            setSurah(surahObj.data);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.selectedSurah, lang]);
    return (
        <div className="quran-view">
            <div className="quran-view-surah">
                <div className="quran-view-surah-openning"><Translate id="quran.openning" /></div>
                {
                    isLoading ?
                        <Loader />
                        :
                        error ?
                            error
                            :
                            surah?.ayahs?.map(ayah => {
                                return (
                                    <Fragment key={ayah.number}>
                                        {(lang === 'ar' && ayah.numberInSurah === 1 && props.selectedSurah !== 1) ? ayah.text.replace('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', '') : ayah.text}&nbsp;<span>{ayah.numberInSurah}</span>&nbsp;
                                    </Fragment>
                                )
                            })
                }
            </div>
        </div>
    )
}

export default QuranView;