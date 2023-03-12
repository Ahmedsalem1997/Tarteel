import HomeSection from "../../components/HomeSection/HomeSection";
import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";

const AboutUs = () => {
    return (
        <LayoutWrapper>
            <div className="container">
                <HomeSection header="footer.aboutUs">
                    <p className="fs-4">
                        ترتيل منصة خاصة بقراءة القرآن الكريم  بطريقة صحيحة  عن طريق معلمين موثقين لتصحيح التلاوات
                        نهدف إلى جعل ترتيل واحدة من أكبر منصّات التواصل الإجتماعي لمحبي القرآن الكريم، حيث يمكنهم التواصل، المشاركة، التعلم وتحسين تلاوتهم للقرآن.

                        يستطيع المشترك من خلال ترتيل الدخول  وتسجيل قرائته وسيقوم احد المعلمين بالاستماع لها وتصحيحها اذا لزم الأمر.
                        ترتيل يحتوي بالاضافة للقرآن الكريم على  محتويات اسلامية منوعه لتغطية كل المواسم الاسلامية  وكل ما يحتاجه المسلم في حياته
                    </p>
                </HomeSection>
            </div>
        </LayoutWrapper>
    )
}

export default AboutUs;