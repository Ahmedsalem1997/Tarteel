import Navigation from "../Navigation/Navigation";
import { useSelector, useDispatch } from 'react-redux'
import { Translate } from "../../helpers/Translate/Translate";

const Carousel = () => {
  const dispatch = useDispatch();
  const globalLang = useSelector(state => {
    return state.globalLang
  });
  const img1 = require("../../assets/images/Group 3753.webp");
  const img2 = require("../../assets/images/Group 3753@2x.webp");
  const img3 = require("../../assets/images/Group 3753@3x.webp");
  const changeLang = () => {
    console.log(globalLang);
    if (globalLang === 'en') {
      dispatch({ type: 'ar' })
    } else {
      dispatch({ type: 'en' })
    }
  }
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
        <h2><Translate id="carousel.title" /></h2>
        <button className="register-now-btn" onClick={changeLang}><Translate id="carousel.button" /></button>
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
