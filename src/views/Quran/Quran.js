import { Fragment, useState } from "react";
import Carousel from "../../components/Carousel/Carousel";
import CarouselWrapper from "../../components/CarouselWrapper/CarouselWrapper";
// import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import QuranNavigator from "../../components/QuranNavigator/QuranNavigator";
import QuranView from "../../components/QuranView/QuranView";

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
                <QuranNavigator onSurahChange={surahChangeHandler} />
                <QuranView selectedSurah={selectedSurah} />
            </div>
        </Fragment>

        // </LayoutWrapper>
    )
}

export default Quran;