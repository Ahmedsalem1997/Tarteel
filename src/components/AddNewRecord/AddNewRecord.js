import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Translate from "../../helpers/Translate/Translate";
import useHTTP from "../../hooks/use-http";
import { getAuth } from "../../utils/Auth";
import BlackBlock from "../BlackBlock/BlackBlock";

const AddNewRecord = (props) => {
    const [uploadedRecord, setUploadedRecord] = useState(undefined);
    const [selectedSurah, setSelectedSurah] = useState(0);
    const [ayaFrom, setAyaFrom] = useState('');
    const [ayaTo, setAyaTo] = useState('');
    const [surahList, setSurahList] = useState([]);
    const [ayahs, setAyahs] = useState([]);
    const { isLoading, error, sendRequest: addNewRecord } = useHTTP();
    const { isLoading: isLoadingSurah, error: getSurahError, sendRequest: getSurahList } = useHTTP();
    const lang = useSelector(state => {
        return state.lang.globalLang;
    });
    const { token } = getAuth();
    useEffect(() => {
        getSurahList(
            { baseUrl: "http://api.alquran.cloud/v1/", url: "surah" },
            (surahObj) => setSurahList(surahObj.data)
        );
    }, []);

    const onAddNewRecordHandler = (e) => {
        e.preventDefault();
        console.log(uploadedRecord);
        // let idCardBase64 = '';
        // getBase64(uploadedRecord, (result) => {
        //     idCardBase64 = result;
        //     console.log(idCardBase64);
        // });
        const body = {
            file: uploadedRecord,
            title: "Helloooo",
            surah_id: selectedSurah,
            from_ayah: ayaFrom,
            to_ayah: ayaTo,
        }
        let formData = new FormData();
        formData.append('title', 'Hellooo');
        formData.append('surah_id', selectedSurah);
        formData.append('from_ayah', ayaFrom);
        formData.append('to_ayah', ayaTo);
        formData.append('file', uploadedRecord);
        addNewRecord(
            {
                url: 'records',
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            },
            data => {
                console.log(data);
                props.setIsOpen(false);
            }
        )
    }

    const surahChangeHandler = (e) => {
        setSelectedSurah(e.target.value);
        const newAyahs = Array.from({ length: surahList[e.target.value - 1].numberOfAyahs }, (value, i) => i + 1);;
        setAyahs(newAyahs);
    }

    const uploadFile = () => {
        document.getElementById('upload-file').click();
    }

    const uploadRecordHandler = (e) => {
        console.log(e.target.files);
        setUploadedRecord(e.target.files[0]);
        console.log(typeof (uploadedRecord));
    }
    return (
        <BlackBlock width="80%">
            <div className="add-new-record">
                <form onSubmit={onAddNewRecordHandler}>
                    <div className="add-new-record-input">
                        <label><Translate id="input.label.selectSurah" /></label>
                        <select value={selectedSurah} onChange={surahChangeHandler}>
                            <option disabled value="0">اختر سورة</option>
                            {surahList.map(surah => {
                                return (
                                    <option key={surah.number} value={surah.number}>{lang === 'ar' ? surah.name : surah.englishName}</option>
                                )
                            })}
                            {/* <option value="1">البقرة</option>
                            <option value="2">ال عمران</option>
                            <option value="3">يس</option>
                            <option value="4">الرحمن</option> */}
                        </select>
                    </div>
                    <div className="add-new-record-input">
                        <label><Translate id="input.label.selectAyah" /></label>
                        <select value={ayaFrom} className="aya-from" onChange={(e) => setAyaFrom(e.target.value)}>
                            <option value="" disabled>من ايه</option>
                            {ayahs.map((ayah) => {
                                return (
                                    <option key={ayah} value={ayah}>{ayah}</option>
                                )
                            })}
                            {/* <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option> */}
                        </select>
                        <span><Translate id="input.label.to" /></span>
                        <select value={ayaTo} className="aya-to" onChange={(e) => setAyaTo(e.target.value)}>
                            <option value="" disabled>إلى ايه</option>
                            {ayahs.map((ayah) => {
                                return (
                                    <option key={ayah} value={ayah}>{ayah}</option>
                                )
                            })}
                            {/* <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option> */}
                        </select>

                    </div>
                    <div className="add-new-record-input">
                        <label><Translate id="input.label.selectRecitation" /></label>
                        <select>
                            <option value="1">ورش</option>
                            <option value="2">حفص</option>
                            <option value="3">هشام</option>
                            <option value="4">قالون</option>
                        </select>
                    </div>
                    <div>
                        <button type="button"><Translate id="button.startRecording" /> <i className="fa-solid fa-microphone"></i></button>
                        <button type="button" onClick={uploadFile}><Translate id="button.haveRecord" /> <i className="fa-solid fa-cloud-arrow-up"></i></button>
                        <input onChange={uploadRecordHandler} id="upload-file" type="file"></input>
                    </div>
                    <div className="add-new-record-actions">
                        <button type="submit"><Translate id="button.share" /></button>
                        <button type="button" onClick={() => props.setIsOpen(false)}><Translate id="button.cancel" /></button>
                    </div>
                </form>
            </div>
        </BlackBlock>

    )
}

export default AddNewRecord;