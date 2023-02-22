import { useDispatch } from "react-redux";
import { Translate } from "../../helpers/Translate/Translate";
import { Fragment } from "react";
import { getAuth } from "../../utils/Auth";
import { modalsActions } from "../../store/Modals/Modals";
const Carousel = () => {
  const dispatch = useDispatch();
  const { isAuth } = getAuth();
  const openAddNewRecordModal = () => {
    if (!isAuth) {
      dispatch(modalsActions.openLoginModal());
    } else {
      dispatch(modalsActions.openAddNewRecordModal());
    }
  };

  const openLoginModal = () => {
    dispatch(modalsActions.openLoginModal());
  };
  return (
    <Fragment>
      <h2 className="carousel-content-title">
        <Translate id="carousel.title" />
      </h2>
      <button className="register-now-btn" onClick={openAddNewRecordModal}>
        <Translate id="button.startRecording" />
      </button>
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>

      <div className="register-bar">
        <p>
          <Translate id="carousel.bar" />
        </p>
        {!isAuth && (
          <button onClick={openLoginModal} className="register-now-btn">
            <Translate id="button.subscribe" />
          </button>
        )}
      </div>
    </Fragment>
  );
};

export default Carousel;
