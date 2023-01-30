import { Fragment } from "react";
import HomeSection from "../../components/HomeSection/HomeSection";
import Records from "../../components/Records/Records";
import ExsitingRecord from "../../components/SingleRecordCard/ExsitingRecord/ExsitingRecord";
import NewRecord from "../../components/SingleRecordCard/NewRecord/NewRecord";

const Home = () => {
    const img = require('../../assets/images/record.jpg');
    return (
        <Fragment>
            <HomeSection header="تسجيلاتي" showAll="records">
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
            </HomeSection>

            <HomeSection header="عنوان اخر">
                <Records />
            </HomeSection>
            
            <HomeSection header="المحتوى الاسلامي" showAll="islamic">
                <div className="home-section-content">
                    <ExsitingRecord btn={true} img={img} name="اسم التسجيل"></ExsitingRecord>
                    <ExsitingRecord btn={true} img={img} name="اسم التسجيل"></ExsitingRecord>
                    <ExsitingRecord btn={true} img={img} name="اسم التسجيل"></ExsitingRecord>
                    <ExsitingRecord btn={true} img={img} name="اسم التسجيل"></ExsitingRecord>
                    <ExsitingRecord btn={true} img={img} name="اسم التسجيل"></ExsitingRecord>
                    <ExsitingRecord btn={true} img={img} name="اسم التسجيل"></ExsitingRecord>
                    <ExsitingRecord btn={true} img={img} name="اسم التسجيل"></ExsitingRecord>
                </div>
            </HomeSection>
        </Fragment>
    )
}

export default Home;