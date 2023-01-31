import ExsitingRecord from "../SingleRecordCard/ExsitingRecord/ExsitingRecord";

const IslamicContentHome = () => {
    const img = require('../../assets/images/record.jpg');
    return (
        <div className="home-section-content">
            <ExsitingRecord btn={true} img={img} name="اسم التسجيل"></ExsitingRecord>
            <ExsitingRecord btn={true} img={img} name="اسم التسجيل"></ExsitingRecord>
            <ExsitingRecord btn={true} img={img} name="اسم التسجيل"></ExsitingRecord>
            <ExsitingRecord btn={true} img={img} name="اسم التسجيل"></ExsitingRecord>
            <ExsitingRecord btn={true} img={img} name="اسم التسجيل"></ExsitingRecord>
            <ExsitingRecord btn={true} img={img} name="اسم التسجيل"></ExsitingRecord>
            <ExsitingRecord btn={true} img={img} name="اسم التسجيل"></ExsitingRecord>
        </div>
    )
}

export default IslamicContentHome;