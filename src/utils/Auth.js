import { redirect } from "react-router-dom";

export function setAuth(data) {
    data?.token && localStorage.setItem('token', data.token);
    data?.user && localStorage.setItem('loggedUser', JSON.stringify(data.user));
}

export function getAuth() {
    const token = localStorage.getItem('token');
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    const isAuth = token && loggedUser;
    return { token, loggedUser, isAuth }
}

export function checkAuthLoader() {
    const { token } = getAuth();
    if (!token) {
        return redirect('/login');
    }
    return null;
}