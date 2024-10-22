import './appHeader.scss';

import { NavLink } from 'react-router-dom';

const AppHeader = () => {
    const toggleActive = ({isActive}: {isActive: boolean}) => isActive ? "active" : "";

    return (
        <header className="app__header mainHeader app-container">
            <div className='mainHeader__topRow'>
                <div className='mainHeader__themeToggle themeToggle'>
                    <span className='themeToggle__label'>Theme</span>
                    <label className = "switch">
                        <input type="checkbox"></input>
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>
            <div className="mainHeader__bottomRow">
                <h1 className="app__title">
                    <a href="/#">
                        <span>Marvel</span> information portal
                    </a>
                </h1>
                <nav className="app__menu">
                    <ul>
                        <li><NavLink to="/" className={toggleActive}>Characters</NavLink></li>
                        /
                        <li><NavLink to="/comics" className={toggleActive}>Comics</NavLink></li>
                        /
                        <li><NavLink to="/testForm" className={toggleActive}>Test Form</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default AppHeader;