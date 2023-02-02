import Carousel from "../Carousel/Carousel";
import Footer from "../Footer/Footer";
import HomeSubscribe from "../HomeSubscribe/HomeSubscribe";

const LayoutWrapper = (props) => {
    return (
        <div className="layout-wrapper">
            <Carousel />
            {/* <div className="container"> */}
                {props.children}
            {/* </div> */}
            <HomeSubscribe />
            <Footer />
        </div>
    )
}

export default LayoutWrapper;