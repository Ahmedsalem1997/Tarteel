import { Fragment, useEffect, useState } from "react";
import useHTTP from "../../hooks/use-http";
import { useSelector } from "react-redux";
import Translate from "../../helpers/Translate/Translate";
import Loader from "../Loader/Loader";

const QuranView = (props) => {
  const [surah, setSurah] = useState([]);
  const lang = useSelector((state) => {
    return state.lang.globalLang;
  });
  const token = useSelector(state => {
    return state.auth.token;
  })
  const { isLoading, error, sendRequest: getSurah } = useHTTP();


  useEffect(() => {
    console.log('useEffect', lang);
    // const surahUrl = props.selectedSurah + '/' + lang + '.ahmedali';
    // console.log('getSurah', surahUrl);
    getSurah(
      {
        url: `quran/surahs/${props.selectedSurah}?with_ayahs=1`,
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      },
      (surahObj) => {
        setSurah(surahObj.data);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, props.selectedSurah]);

  return (
    <div className="quran-view">
      <div className="quran-view-surah">
        <p className="quran-view-surah-name">{lang === "ar" ? surah?.name : surah?.english_name}</p>
        <div className="quran-view-surah-openning">
          <Translate id="quran.openning" />
        </div>
        {isLoading ?
          <Loader />
          :
          error ? error :
            surah?.ayahs?.map((ayah, i, ayahsArr) => {
              return (
                <Fragment key={ayah?.number}>
                  {ayahsArr[i - 1]?.page < ayahsArr[i]?.page && (
                    <div className="quran-view-page-seprator">

                      <p>
                        {lang === "ar"
                          ? ayahsArr[i - 1]?.page.toLocaleString("ar-EG")
                          : ayahsArr[i - 1]?.page}
                      </p>
                      <hr />
                    </div>
                  )}

                  {
                    (lang === 'ar' &&
                      ayah?.number_in_surah === 1 &&
                      props?.selectedSurah !== 1)
                      ? ayah?.text.replace('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', '')
                      : ayah?.text}
                  <span>
                    {lang === "ar"
                      ? ayah?.number_in_surah?.toLocaleString("ar-EG")
                      : ayah?.number_in_surah}
                  </span>
                </Fragment>
              );
            })
        }
        {/* )} */}
      </div>
    </div>
  );
};

export default QuranView;
