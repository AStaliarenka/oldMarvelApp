import "./appHeader.scss";

import Theme from "../theme";

import { NavLink } from "react-router-dom";

import AppContainer from "../appContainer";

import { useAppSelector, useAppDispatch } from "../../hooks/redux.hooks";

import { userLoggedOut } from "../../app/reducers/auth";

const AppHeader = () => {
	const toggleActive = ({isActive}: {isActive: boolean}) => isActive ? "active" : "";
	// active class is being added from NavLink, TODO: delete

	const isTestLogin = process.env.REACT_APP_TEST_LOGIN;

	const userName = useAppSelector((state) => state.auth.username);
	const isLoggedIn = useAppSelector((state) => state.auth.isSignedIn);

	const dispatch = useAppDispatch()

	function logoutHandler() {
		dispatch(userLoggedOut())
	}

	const testLoginButton = isTestLogin ? (
		isLoggedIn ? (
			<NavLink to="/" className="login-link">
				<button className="login-link__button" onClick={logoutHandler}>LOGOUT</button>
			</NavLink>
		)
			: (
				<NavLink to="/login" className="login-link">
					<button className="login-link__button">LOGIN</button>
				</NavLink>
			)
	)
		: null

	const userLabel = isTestLogin ? (
		<span className="topRow__username">{userName}</span>
	) : null;

	return (
		<header className="app__header mainHeader">
			<AppContainer>
				<div className='mainHeader__topRow topRow'>
					{userLabel}
					<div className="topRow__right-block">
						<Theme/>
						{testLoginButton}
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
			</AppContainer>
		</header>
	)
}

export default AppHeader;