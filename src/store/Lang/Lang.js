import { createStore } from 'redux';

let lang = localStorage.getItem('lang');
const rootEle = document.getElementById('root-html');
let translation;
if (!lang) {
    lang = rootEle.getAttribute('lang');
}
translation = require(`../../assets/json/lang/${lang}.json`);
rootEle.setAttribute('lang', lang);
if (lang === 'ar') {
    rootEle.setAttribute('dir', 'rtl');
}
const langReducer = (state = { globalLang: lang || 'en', translation: translation}, action) => {
    if (action.type === 'ar' || action.type === 'en') {
        if (action.type === 'ar') {
            rootEle.setAttribute('dir', 'rtl')
        }
        if (action.type === 'en') {
            rootEle.removeAttribute('dir')
        }
        rootEle.setAttribute('lang', action.type);
        localStorage.setItem('lang', action.type);
        return {
            globalLang: action.type,
            translation: require(`../../assets/json/lang/${action.type}.json`)
        }
    }
    return state;
}

const store = createStore(langReducer);

export default store;