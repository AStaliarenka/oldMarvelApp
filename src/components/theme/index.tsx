import { useAppDispatch, useAppSelector } from "../../hooks/redux.hooks";
import { useEffect } from "react";
import { set } from "./slice";

import "./style.scss";

const Theme = () => {
    const theme = useAppSelector((state) => state.theme);

    const dispatch = useAppDispatch();

    useEffect(() => {
        document.documentElement.dataset.theme = theme;

        localStorage.setItem('theme', theme);
    }, [ theme ]);

    const handleChange = () => {
        const next = theme === 'dark' ? 'light' : 'dark';

        dispatch(set(next));
    }

    return (
        <div className='themeToggle'>
            <span className='themeToggle__label'>Theme</span>
            <label className = "switch">
                <input type="checkbox"
                    checked = {theme === 'dark' ? true : false}
                    onClick={handleChange}>
                </input>
                <span className="slider round"></span>
            </label>
        </div>
    );
};

export default Theme;