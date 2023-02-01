import Navigation from "../Navigation/Navigation";

const Carousel = () => {
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
        <h2>تعلم  القران بالطريقة الصحيحة</h2>
        <button className="register-now-btn">ابدا تسجيلك الان</button>
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>

        <Navigation />
        <div className="register-bar">
          <p>كلمات خاصة بالاشتراك وسعر الخدمة</p>
          <button className="register-now-btn">اشترك الان</button>
        </div>
      </div>
    </div>
  )
};

export default Carousel;
