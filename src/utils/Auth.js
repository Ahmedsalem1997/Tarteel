import { v4 as uuidv4 } from 'uuid';

export function setAuth(data) {
    data?.token && localStorage.setItem('token', data.token);
    data?.user && localStorage.setItem('loggedUser', JSON.stringify(data.user));
}

export function getAuth() {
    const token = localStorage.getItem('token');
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    const isSubscribed = token && loggedUser;
    const isAuth = isSubscribed && loggedUser.is_subscribed;
    return { token, loggedUser, isAuth, isSubscribed }
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedUser');
    // localStorage.removeItem('longTermToken');
}

export function generateLongTermToken() {
    const longTermToken =
        Math.floor(Math.random() * 100000000) + '_' +
        new Date().getDate() +
        new Date().getMonth() +
        new Date().getFullYear() +
        Math.floor(Math.random() * 100000000) + '_' +
        new Date().getTime() + '_' +
        uuidv4();
    return longTermToken;
}

export function setLongTermToken() {
    if (getLongTermToken()) {
        return getLongTermToken();
    }
    const longTermToken = generateLongTermToken();
    localStorage.setItem('longTermToken', longTermToken);
    return longTermToken;
}

export function getLongTermToken() {
    return localStorage.getItem('longTermToken');
}

