import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalsActions } from "../../store/Modals/Modals";
import Modal from "../Modal/Modal";
import { Translate } from "../../helpers/Translate/Translate";
import ReactPlayer from "react-player";

const MediaPlayer = () => {
  const dispatch = useDispatch();
  const closeMediaModal = () => {
    dispatch(modalsActions.closeMediaModal());
  };
  const record = useSelector((state) => state.modals.record);
  const lang = useSelector((state) => {
    return state.lang.globalLang;
  });
  return (
    <Modal showClose={true} onClose={closeMediaModal}>
      {record.surah && (
        <div className="text-center fs-1">
          <span>
            {lang === "ar" ? record?.surah?.name : record?.surah?.english_name}
            &nbsp;
          </span>
          <span>
            <Translate id="record.fromAyah" /> &nbsp;
            {record?.from_ayah_number}&nbsp;
            <Translate id="record.toAyah" /> &nbsp;
            {record?.to_ayah_number}
          </span>
        </div>
      )}
      {!record.surah && (
        <span className="fs-1 my-3">
          {lang === "ar" ? record?.title : record?.title_en}
        </span>
      )}
      <ReactPlayer
        height="5rem"
        url={record.file}
        controls
        className="audio-source"
      />
      {/* <audio controls className="audio-source">
        <source src={record.file} type="audio/mp3"></source>
      </audio> */}
    </Modal>
  );
};

export default MediaPlayer;
