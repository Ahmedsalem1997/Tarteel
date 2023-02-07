import { useSelector, useDispatch } from 'react-redux'
import { Translate } from "../../helpers/Translate/Translate";
import { Fragment } from "react";
import { Link } from 'react-router-dom';

const Carousel = () => {
  const dispatch = useDispatch();
  const globalLang = useSelector(state => {
    return state.globalLang
  });

  const changeLang = () => {
    console.log(globalLang);
    if (globalLang === 'en') {
      dispatch({ type: 'translation', lang: 'ar' })
    } else {
      dispatch({ type: 'translation', lang: 'en' })
    }
  }
  return (
    <Fragment>
      <h2 className='carousel-content-title'><Translate id="carousel.title" /></h2>
      <button className="register-now-btn" onClick={changeLang}><Translate id="button.startRecording" /></button>
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>

      <div className="register-bar">
        <p><Translate id="carousel.bar" /></p>
        <Link to="/login"><button className="register-now-btn"><Translate id="button.subscribe" /></button></Link>
      </div>
    </Fragment>

  )
};

export default Carousel;
