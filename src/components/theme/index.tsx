import { useAppDispatch, useAppSelector } from "../../hooks/redux.hooks";
import { useEffect } from "react";
import { set } from "./slice";
import { THEME_VALUES } from "./slice/@types";

import "./style.scss";

const Theme = () => {
    const theme = useAppSelector((state) => state.theme);

    const dispatch = useAppDispatch();

    useEffect(() => {
        document.documentElement.dataset.theme = theme;

        localStorage.setItem('theme', theme);
    }, [ theme ]);

    const handleChange = () => {
        const next = theme === THEME_VALUES.dark ? THEME_VALUES.light : THEME_VALUES.dark;

        dispatch(set(next));
    }

    return (
        <div className='themeToggle'>
            <span className='themeToggle__label'>{theme === THEME_VALUES.dark ? 'Dark' : 'Light'}</span>
            <label className = "switch">
                <input type="checkbox"
                    defaultChecked = {theme === THEME_VALUES.dark ? true : false}
                    onClick={handleChange}>
                </input>
                <span className="slider round"></span>
            </label>
        </div>
    );
};

export default Theme;