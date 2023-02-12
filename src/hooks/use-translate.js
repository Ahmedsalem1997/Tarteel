import { useSelector } from 'react-redux'

const useTranslate = (text) => {
    const translation = useSelector(state => {
        return state.lang.translation
    });
    let translatedText = { ...translation };
    const objDirArr = text.split('.');
    objDirArr.forEach(dir => {
        translatedText = translatedText[dir];
    });
    if (!translatedText) {
        return text;
    }
    return translatedText;
}

export default useTranslate;