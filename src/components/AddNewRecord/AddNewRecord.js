const AddNewRecord = () => {
    return(
        <div className="add-new-record">
            <form>
                <div className="add-new-record-input">
                    <label>اختر السورة المراد تسجيلها</label>
                    <select>
                        <option value="1">البقرة</option>
                        <option value="2">ال عمران</option>
                        <option value="3">يس</option>
                        <option value="4">الرحمن</option>
                    </select>
                </div>
                <div className="add-new-record-input">
                    <label>اختر الآية</label>
                    <select className="aya-from">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    <span>إلى</span>
                    <select className="aya-to">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>

                </div>
                <div className="add-new-record-input">
                    <label>اختر نوع الرواية</label>
                    <select>
                        <option value="1">ورش</option>
                        <option value="2">حفص</option>
                        <option value="3">هشام</option>
                        <option value="4">قالون</option>
                    </select>
                </div>
                <div>
                    <button>ابدا التسجيل الان <i className="fa-solid fa-microphone"></i></button>
                    <button>لدي مقطع صوتي <i className="fa-solid fa-cloud-arrow-up"></i></button>
                </div>
            </form>
            <div className="add-new-record-actions">
                <button>مشاركة</button>
                <button>إلغاء</button>
            </div>
        </div>
    )
}

export default AddNewRecord;