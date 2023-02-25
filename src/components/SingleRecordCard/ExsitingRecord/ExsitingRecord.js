import { Translate } from "../../../helpers/Translate/Translate";
import SingleRecordCard from "../SingleRecordCard";
import { useDispatch } from "react-redux";
import { modalsActions } from "../../../store/Modals/Modals";
import { useSelector } from "react-redux";
import { getAuth } from '../../../utils/Auth';

const ExsitingRecord = (props) => {
  const { isAuth } = getAuth()
  const dispatch = useDispatch();
  const openMediaModal = () => {
    if (!isAuth) {
      dispatch(modalsActions.openLoginModal());
    } else {
      dispatch(modalsActions.openMediaModal(props.record));
    }
  };

  const lang = useSelector((state) => {
    return state.lang.globalLang;
  });
  return (
    <SingleRecordCard>
      <div onClick={openMediaModal} style={props?.record?.cover ? { backgroundImage: `url(${props?.record?.cover})` } : {}}
        className="single-record-card-img"
      // src={props?.record?.cover}
      >
        {!props.btn && <i className="fa-solid fa-play fa-3x"></i>}
      </div>
      <div className="single-record-card-name" onClick={openMediaModal}>
        <div className="text-center">
          {!props.btn &&
            <span>
              {lang === "ar"
                ? props?.record?.surah?.name
                : props?.record?.surah?.english_name}
              &nbsp;
            </span>}
          {!props.btn &&
            <span>
              <Translate id="record.fromAyah" /> &nbsp;
              {props?.record?.from_ayah_number}&nbsp;
              <Translate id="record.toAyah" /> &nbsp;
              {props?.record?.to_ayah_number}
            </span>}
          {props.btn &&
            <span>
              {
                lang === 'ar' ?
                  props?.record?.title
                  :
                  props?.record?.title_en
              }
            </span>}
        </div>

        {props.btn && (
          <button className="trans-btn" onClick={openMediaModal}>
            <Translate id="button.listen" />
          </button>
        )}
      </div>
    </SingleRecordCard>
  );
};

export default ExsitingRecord;
