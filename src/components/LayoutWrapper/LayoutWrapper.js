import Carousel from "../Carousel/Carousel";
import CarouselWrapper from "../CarouselWrapper/CarouselWrapper";
import Footer from "../Footer/Footer";
import HomeSubscribe from "../HomeSubscribe/HomeSubscribe";

const LayoutWrapper = (props) => {
    return (
        <div className="layout-wrapper">
            <CarouselWrapper>
                <Carousel />
            </CarouselWrapper>
            {props.children}
            <HomeSubscribe />
            <Footer />
        </div>
    )
}

export default LayoutWrapper;