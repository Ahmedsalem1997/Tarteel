import { getAuth } from "../../utils/Auth";
import Navigation from "../Navigation/Navigation";

const CarouselWrapper = (props) => {
    const img1 = require("../../assets/images/bg9.png");
    const img2 = require("../../assets/images/bg8.png");
    const img3 = require("../../assets/images/bg7.png");
    // const img4 = require("../../assets/images/bg4.png");
    const { loggedUser } = getAuth();
    return (
        <div id="carouselExampleIndicators" className="carousel slide">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={img1} className="d-block min-vw-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src={img2} className="d-block min-vw-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src={img3} className="d-block min-vw-100" alt="..." />
                </div>
                {/* <div className="carousel-item">
                    <img src={img4} className="d-block min-vw-100" alt="..." />
                </div> */}
            </div>
            <div className="carousel-content">
                {props.children}
            </div>
            <Navigation />
        </div>
    )
}

export default CarouselWrapper;