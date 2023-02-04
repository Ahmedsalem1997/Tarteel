import Navigation from "../Navigation/Navigation";

const CarouselWrapper = (props) => {
    const img1 = require("../../assets/images/Group 3753.webp");
    const img2 = require("../../assets/images/Group 3753@2x.webp");
    const img3 = require("../../assets/images/Group 3753@3x.webp");
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
            </div>
            <div className="carousel-content">
                {props.children}
            </div>
            <Navigation />
        </div>
    )
}

export default CarouselWrapper;