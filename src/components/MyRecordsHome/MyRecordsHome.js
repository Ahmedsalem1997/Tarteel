import NewRecord from "../SingleRecordCard/NewRecord/NewRecord";
import ExsitingRecord from "../SingleRecordCard/ExsitingRecord/ExsitingRecord";


const MyRecordsHome = () => {
    const img = require('../../assets/images/record.jpg');
    return (
        <div className="home-section-content">
            <NewRecord />
            <ExsitingRecord img={img} name="اسم التسجيل"></ExsitingRecord>
            <ExsitingRecord img={img} name="اسم التسجيل"></ExsitingRecord>
            <ExsitingRecord img={img} name="اسم التسجيل"></ExsitingRecord>
            <ExsitingRecord img={img} name="اسم التسجيل"></ExsitingRecord>
            <ExsitingRecord img={img} name="اسم التسجيل"></ExsitingRecord>
            <ExsitingRecord img={img} name="اسم التسجيل"></ExsitingRecord>
            <ExsitingRecord img={img} name="اسم التسجيل"></ExsitingRecord>
        </div>
    )
}

export default MyRecordsHome;