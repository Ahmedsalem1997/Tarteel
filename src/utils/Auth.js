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