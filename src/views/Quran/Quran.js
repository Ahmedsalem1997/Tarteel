import { Fragment, useState } from "react";
import Carousel from "../../components/Carousel/Carousel";
import CarouselWrapper from "../../components/CarouselWrapper/CarouselWrapper";
import QuranNavigator from "../../components/QuranNavigator/QuranNavigator";
import QuranView from "../../components/QuranView/QuranView";
import Translate from "../../helpers/Translate/Translate";

const Quran = () => {
    const [selectedSurah, setSelectedSurah] = useState(1);

    const surahChangeHandler = (surahNumber) => {
        setSelectedSurah(surahNumber);
    }
    return (
        // <LayoutWrapper>
        <Fragment>
            <CarouselWrapper>
                <Carousel />
            </CarouselWrapper>
            <div className="quran">
                <div className="quran-title">
                    <h2><Translate id="quran.title" /></h2>
                </div>
                <div className="quran-content">
                    <QuranNavigator onSurahChange={surahChangeHandler} />
                    <QuranView selectedSurah={selectedSurah} />
                </div>
            </div>
        </Fragment>

        // </LayoutWrapper>
    )
}

export default Quran;