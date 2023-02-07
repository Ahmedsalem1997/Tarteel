import { createStore } from 'redux';

const langReducer = (state = { globalLang: 'en', translation: require(`../../assets/json/lang/en.json`)}, action) => {
    if (action.type === 'translation') {
        return {
            globalLang: action.lang,
            translation: require(`../../assets/json/lang/${action.lang}.json`)
        }
    }
    return state;
}

const store = createStore(langReducer);

export default store;