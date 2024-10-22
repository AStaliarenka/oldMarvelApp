import './appHeader.scss';

import Theme from '../theme';

import { NavLink } from 'react-router-dom';

const AppHeader = () => {
    const toggleActive = ({isActive}: {isActive: boolean}) => isActive ? "active" : "";

    return (
        <header className="app__header mainHeader app-container">
            <div className='mainHeader__topRow'>
                <Theme/>
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