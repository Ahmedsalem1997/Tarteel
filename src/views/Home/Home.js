import HomeSection from "../../components/HomeSection/HomeSection";
import ExsitingRecord from "../../components/SingleRecordCard/ExsitingRecord/ExsitingRecord";
import NewRecord from "../../components/SingleRecordCard/NewRecord/NewRecord";

const Home = () => {
    const img = require('../../assets/images/record.jpg');
    return (
        <div>
            <HomeSection header="تسجيلاتي" showAll="records">
                <div className="home-section">
                    <NewRecord />
                    <ExsitingRecord img={img} name="اسم التسجيل"></ExsitingRecord>
                    <ExsitingRecord img={img} name="اسم التسجيل"></ExsitingRecord>
                    <ExsitingRecord img={img} name="اسم التسجيل"></ExsitingRecord>
                    <ExsitingRecord img={img} name="اسم التسجيل"></ExsitingRecord>
                    <ExsitingRecord img={img} name="اسم التسجيل"></ExsitingRecord>
                    <ExsitingRecord img={img} name="اسم التسجيل"></ExsitingRecord>
                    <ExsitingRecord img={img} name="اسم التسجيل"></ExsitingRecord>
                </div>
            </HomeSection>
            <HomeSection header="المحتوى الاسلامي" showAll="islamic">
                <div className="home-section">
                    <ExsitingRecord btn={true} img={img} name="اسم التسجيل"></ExsitingRecord>
                    <ExsitingRecord btn={true} img={img} name="اسم التسجيل"></ExsitingRecord>
                    <ExsitingRecord btn={true} img={img} name="اسم التسجيل"></ExsitingRecord>
                    <ExsitingRecord btn={true} img={img} name="اسم التسجيل"></ExsitingRecord>
                    <ExsitingRecord btn={true} img={img} name="اسم التسجيل"></ExsitingRecord>
                    <ExsitingRecord btn={true} img={img} name="اسم التسجيل"></ExsitingRecord>
                    <ExsitingRecord btn={true} img={img} name="اسم التسجيل"></ExsitingRecord>
                </div>
            </HomeSection>
        </div>
    )
}

export default Home;