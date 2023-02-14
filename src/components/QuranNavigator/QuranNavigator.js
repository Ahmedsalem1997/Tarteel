import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useHTTP from "../../hooks/use-http";
import Loader from "../Loader/Loader";

const QuranNavigator = (props) => {
  const [surahList, setSurahList] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(1);
  const { isLoading, error, sendRequest: getSurahList } = useHTTP();
  const lang = useSelector((state) => {
    return state.lang.globalLang;
  });
  const token = useSelector(state => {
    return state.auth.token;
  })
  const onSurahChange = (surahNumber) => {
    surahNumber = Number(surahNumber);
    props.onSurahChange(surahNumber);
    setSelectedSurah(surahNumber);
  };

  // const surahChangeHandler = (e) => {
  //   e.preventDefault();
  //   props.onSurahChange(e.target.value);
  //   setSelectedSurah(e.target.value);
  // };
  useEffect(() => {
    getSurahList(
      {
        url: "quran/editions/quran-uthmani-min?with_surahs=1",
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      },
      (surahObj) => {
        setSurahList(surahObj.data.surahs);
      }
    );
  }, [getSurahList]);
  return (
    <Fragment>
      <div className="quran-navigator">
        {isLoading && <Loader />}
        {error
          ? error          
          : surahList.map((surah) => {
            return (
              <div
                key={surah?.number}
                className={`quran-navigator-surah ${(selectedSurah === Number(surah?.number)) && "active"
                  }`}
                onClick={() => onSurahChange(surah?.number)}
              >
                <span>
                  {lang === "ar"
                    ? surah?.number?.toLocaleString("ar-EG")
                    : surah?.number}
                </span>
                <p>{lang === "ar" ? surah?.name : surah?.english_name}</p>
              </div>
            );
          })}
      </div>
      <div className="quran-mobile-navigator">
        {isLoading && <Loader />}
        <select
          onChange={(e) => onSurahChange(e.target.value)}
          value={selectedSurah}
        >
          {error
            ? <option value="0" disabled>
              سورة

            </option>
            : surahList.map((surah) => (
              <option key={surah?.number} value={surah?.number}>
                {surah?.number}{" "}
                {lang === "ar" ? surah?.name : surah?.english_name}
              </option>
            ))}
        </select>
      </div>
    </Fragment>
  );
};

export default QuranNavigator;
