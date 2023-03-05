import Navigation from "../Navigation/Navigation";

const CarouselWrapper = (props) => {
    const img1 = require("../../assets/images/bg1.png");
    const img2 = require("../../assets/images/bg2.png");
    const img3 = require("../../assets/images/bg3.png");
    const img4 = require("../../assets/images/bg4.png");
    return (
        <div id="carouselExampleIndicators" className="carousel slide">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={img1} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src={img2} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src={img3} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src={img4} className="d-block w-100" alt="..." />
                </div>
            </div>
            <div className="carousel-content">
                {props.children}
            </div>
            <Navigation />
        </div>
    )
}

export default CarouselWrapper;