import './appHeader.scss';

import { NavLink } from 'react-router-dom';

const AppHeader = () => {
    const toggleActive = ({isActive}: {isActive: boolean}) => isActive ? "active" : "";

    return (
        <header className="app__header">
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
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;