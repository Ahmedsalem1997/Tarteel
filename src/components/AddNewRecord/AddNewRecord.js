import { Translate } from "../../helpers/Translate/Translate";

const AddNewRecord = () => {
    return(
        <div className="add-new-record">
            <form>
                <div className="add-new-record-input">
                    <label><Translate id="input.label.selectSora"/></label>
                    <select>
                        <option value="1">البقرة</option>
                        <option value="2">ال عمران</option>
                        <option value="3">يس</option>
                        <option value="4">الرحمن</option>
                    </select>
                </div>
                <div className="add-new-record-input">
                    <label><Translate id="input.label.selectAya"/></label>
                    <select className="aya-from">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    <span><Translate id="input.label.to"/></span>
                    <select className="aya-to">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>

                </div>
                <div className="add-new-record-input">
                    <label><Translate id="input.label.selectRecitation"/></label>
                    <select>
                        <option value="1">ورش</option>
                        <option value="2">حفص</option>
                        <option value="3">هشام</option>
                        <option value="4">قالون</option>
                    </select>
                </div>
                <div>
                    <button><Translate id="button.startRecording"/> <i className="fa-solid fa-microphone"></i></button>
                    <button><Translate id="button.haveRecord"/> <i className="fa-solid fa-cloud-arrow-up"></i></button>
                </div>
            </form>
            <div className="add-new-record-actions">
                <button><Translate id="button.share"/></button>
                <button><Translate id="button.cancel"/></button>
            </div>
        </div>
    )
}

export default AddNewRecord;