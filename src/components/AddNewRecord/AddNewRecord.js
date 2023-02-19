import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Translate from "../../helpers/Translate/Translate";
import useHTTP from "../../hooks/use-http";
import { modalsActions } from "../../store/Modals/Modals";
import { getAuth } from "../../utils/Auth";
import { isValidFileUploaded } from "../../utils/FileValidation";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";


const AddNewRecord = (props) => {
    const [formAyahs, setFromAyahs] = useState([]);
    const [toAyahs, setToAyahs] = useState([]);
    const [uploadedRecord, setUploadedRecord] = useState(undefined);
    const [selectedSurah, setSelectedSurah] = useState('');
    const [ayaFrom, setAyaFrom] = useState('');
    const [ayaTo, setAyaTo] = useState('');
    const [surahList, setSurahList] = useState([]);
    const [ayahs, setAyahs] = useState([]);
    const [surahId, setSurahId] = useState(0);
    const [uploadedRecordErr, setUploadedRecordErr] = useState('');
    const { isLoading, error, sendRequest } = useHTTP();
    const dispatch = useDispatch();
    const lang = useSelector(state => {
        return state.lang.globalLang;
    });
    const { token } = getAuth();
    useEffect(() => {
        getSurahList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addNewRecord = (formData) => {
        sendRequest(
            {
                url: 'records',
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            },
            data => {
                closeModal();
            },
            err => {

            }
        )
    }

    const getSurahList = () => {
        sendRequest(
            {
                url: "quran/editions/quran-simple-min?with_surahs=1",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            },
            (surahsArr) => setSurahList(surahsArr.data.surahs)
        );
    }

    const getSurahAyahs = (surahId) => {
        sendRequest(
            {
                url: `quran/surahs/${surahId}?with_ayahs=1`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            },
            (ayahsArr) => {
                setAyahs(ayahsArr.data.ayahs);
                setSurahId(ayahsArr.data.id);
                setFromAyahs(ayahsArr.data.ayahs);
                setToAyahs(ayahsArr.data.ayahs);
            }
        )
    }

    const onAddNewRecordHandler = (e) => {
        e.preventDefault();
        // console.log(uploadedRecord);
        // let idCardBase64 = '';
        // getBase64(uploadedRecord, (result) => {
        //     idCardBase64 = result;
        //     console.log(idCardBase64);
        // });
        let formData = new FormData();
        formData.append('title', 'Hellooo');
        formData.append('surah_id', surahId);
        formData.append('from_ayah', ayaFrom);
        formData.append('to_ayah', ayaTo);
        formData.append('file', uploadedRecord);
        addNewRecord(formData);

    }

    const surahChangeHandler = (e) => {
        setSelectedSurah(e.target.value);
        getSurahAyahs(e.target.value);
    }
    const onChangeFromAyahsHandler = (e) => {
        setAyaFrom(e.target.value);
        const filterAyahs = ayahs.slice(e.target.value);
        setToAyahs(filterAyahs)
    }
    const onChangeToAyahsHandler = (e) => {
        setAyaTo(e.target.value);
        const filterAyahs = ayahs.slice(0, e.target.value - 1);
        setFromAyahs(filterAyahs)
    }
    const uploadFile = () => {
        document.getElementById('upload-file').click();
    }

    const uploadRecordHandler = (e) => {
        if (!e.target.files[0]) return;
        const uploadedRecordCurrentErr = isValidFileUploaded(e.target.files[0], 'audio');
        if (!uploadedRecordCurrentErr) {
            setUploadedRecord(e.target.files[0]);
        }
        setUploadedRecordErr(uploadedRecordCurrentErr)
    }

    const closeModal = () => {
        dispatch(modalsActions.closeAddNewRecordModal());
    }
    return (
        <Modal showClose={true} onClose={closeModal}>
            {isLoading && <Loader />}
            <div className="add-new-record">
                <form onSubmit={onAddNewRecordHandler}>
                    <div className="add-new-record-input">
                        <label><Translate id="input.label.selectSurah" /></label>
                        <select name='surahSelect' value={selectedSurah} onChange={surahChangeHandler} >
                            <option disabled value=""><Translate id="addNewRecord.chooseSurah" /></option>
                            {surahList.map(surah => {
                                return (
                                    <option key={surah.number} value={surah.number}>{lang === 'ar' ? surah.name : surah.english_name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="add-new-record-input">
                        <label><Translate id="input.label.selectAyah" /></label>
                        <select name='fromAyahsSelect' value={ayaFrom} className="aya-from" onChange={onChangeFromAyahsHandler} >
                            <option value="" disabled><Translate id="record.fromAyah" /></option>
                            {formAyahs.map((ayah) => {
                                return (
                                    <option key={ayah?.id} value={ayah?.number_in_surah} id={ayah.number_in_surah}>{ayah?.number_in_surah}</option>
                                )
                            })}
                        </select>
                        <span><Translate id="input.label.to" /></span>
                        <select name='toAyahsSelect' value={ayaTo} className="aya-to" onChange={onChangeToAyahsHandler} >
                            <option value="" disabled><Translate id="record.toAyah" /></option>
                            {toAyahs.map((ayah) => {
                                return (
                                    <option key={ayah?.id} value={ayah?.number_in_surah} id={ayah.number_in_surah}>{ayah?.number_in_surah}</option>
                                )
                            })}
                        </select>

                    </div>
                    <div className="add-new-record-input">
                        <label><Translate id="input.label.selectRecitation" /></label>
                        <select required>
                            <option value="1">ورش</option>
                            <option value="2">حفص</option>
                            <option value="3">هشام</option>
                            <option value="4">قالون</option>
                        </select>
                    </div>
                    <div>
                        <button type="button"><Translate id="button.startRecording" /> <i className="fa-solid fa-microphone"></i></button>
                        <button type="button" onClick={uploadFile}><Translate id="button.haveRecord" /> <i className="fa-solid fa-cloud-arrow-up"></i></button>
                        <input accept="audio/*" name="record" onChange={uploadRecordHandler} id="upload-file" type="file"></input>
                    </div>
                    <ErrorMessage message={uploadedRecordErr} />
                    <div className="add-new-record-actions">
                        <button type="submit" disabled={!surahId || !ayaFrom || !ayaTo || !uploadedRecord}><Translate id="button.share" /></button>
                        <button type="button" onClick={closeModal}><Translate id="button.cancel" /></button>
                    </div>
                </form>
            </div>

        </Modal>

    )
}

export default AddNewRecord;