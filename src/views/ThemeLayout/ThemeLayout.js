import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useSearchParams } from "react-router-dom";
// import { themeActions } from "../../store/Theme/Theme";

const ThemeLayout = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    // const dispatch = useDispatch();
    const currentTheme = useSelector(state => {
        return state.theme.theme;
    })
    const [operator, setOperator] = useState(searchParams.get('operator') || localStorage.getItem('theme'));
    const rootEle = document.getElementsByTagName('body')[0];

    useEffect(() => {
        // if (!theme) {
        //   setTheme('zain');
        // }
        if (!operator) {
            setOperator('zain');
        }
        console.log(operator);
        // dispatch(themeActions.theme(operator));
        localStorage.setItem('theme', operator);
        // const theme = operator+'-theme';
        rootEle.classList.add(`${operator}-theme`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // useEffect(() => {
    //     localStorage.setItem("theme", currentTheme);
    //     // rootEle.classList.add(currentTheme);
    // }, [currentTheme]);
    return (
        <Outlet></Outlet>
    )
}

export default ThemeLayout;