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
  const onSurahChange = (surahNumber) => {
    props.onSurahChange(surahNumber);
    setSelectedSurah(surahNumber);
  };

  const surahChangeHandler = (e) => {
    e.preventDefault();
    props.onSurahChange(e.target.value);
    setSelectedSurah(e.target.value);
  };
  useEffect(() => {
    getSurahList(
      { baseUrl: "http://api.alquran.cloud/v1/", url: "surah" },
      (surahObj) => setSurahList(surahObj.data)
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
                  key={surah.number}
                  className={`quran-navigator-surah ${
                    selectedSurah === surah.number && "active"
                  }`}
                  onClick={() => onSurahChange(surah.number)}
                >
                  <span>
                    {lang === "ar"
                      ? surah.number.toLocaleString("ar-EG")
                      : surah.number}
                  </span>
                  <p>{lang === "ar" ? surah.name : surah.englishName}</p>
                </div>
              );
            })}
      </div>
      <div className="quran-mobile-navigator">
        {isLoading && <Loader />}
        <select
          defaultValue="سورة"
          onChange={surahChangeHandler}
        >
          <option className="text-black" value={"سورة"} disabled>
            سورة
          </option>
          {error
            ? error
            : surahList.map((surah) => (
                <option key={surah.name}>
                  {surah.number}{" "}
                  {lang === "ar" ? surah.name : surah.englishName}
                </option>
              ))}
        </select>
      </div>
    </Fragment>
  );
};

export default QuranNavigator;
