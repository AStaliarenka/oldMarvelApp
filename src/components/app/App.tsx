import { BrowserRouter, Route, Routes } from "react-router-dom";
import {lazy, Suspense} from "react";

import AppHeader from "../appHeader/AppHeader";
import AppFooter from "../appFooter";
import Spinner from "../spinner/Spinner";

import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import { MainPage, ComicsPage, TestFormPage, TestLoginPage } from "../pages";

import AppContainer from "../appContainer";

import "./style.scss"

// lazy works only with Suspens wrapper
const Page404 = lazy(() => import("../pages/404"));
const SingleComicPage = lazy(() => import("../pages/singleComic"));

const App  = () => {
	const errFallback = <p>Something went wrong</p>;
    
	return (
		<BrowserRouter>
			<div className="app">
				<AppHeader/>
				<main>
					<Suspense fallback={<Spinner/>}>
						<Routes>
							<Route path='/' element={
								<AppContainer>
									<MainPage/>
								</AppContainer>
                                
							}>
							</Route>
							<Route path='comics' element={
								<AppContainer>
									<ErrorBoundary fallback={errFallback}>
										<ComicsPage/>
									</ErrorBoundary>
								</AppContainer>
							}>
							</Route>
							<Route path='comics/:comicId' element={
								<AppContainer>
									<ErrorBoundary fallback={errFallback}>
										<SingleComicPage/>
									</ErrorBoundary>
								</AppContainer>
							}>
							</Route>
							<Route path='testForm' element={
								<ErrorBoundary fallback={errFallback}>
									<TestFormPage/>
								</ErrorBoundary>
							}>
							</Route>
							<Route path='login' element={
								<ErrorBoundary fallback={errFallback}>
									<TestLoginPage/>
								</ErrorBoundary>
							}>
							</Route>
							<Route path='*' element={
								<AppContainer>
									<Page404/>
								</AppContainer>
							}>
							</Route>
						</Routes>
					</Suspense>  
				</main>
				<AppFooter/>
			</div>
		</BrowserRouter>
	);
}

export default App;
