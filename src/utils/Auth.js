import { redirect } from "react-router-dom";

export function setAuth(data) {
    data?.token && localStorage.setItem('token', data.token);
    data?.user && localStorage.setItem('user', JSON.stringify(data.user));
}

export function getAuth() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const isAuth = token && user;
    return { token, user, isAuth }
}

export function checkAuthLoader() {
    const { token } = getAuth();
    console.log(token);
    if (!token) {
        return redirect('/login');
    }
}