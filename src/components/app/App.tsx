import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppHeader from "../appHeader/AppHeader";

import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import { MainPage, ComicsPage, Page404, SingleComicPage, TestFormPage } from '../pages';

const App  = () => {
    const errFallback = <p>Something went wrong</p>;
    
    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path='/' element={
                            <MainPage/>
                        }>
                        </Route>
                        <Route path='comics' element={
                            <ErrorBoundary fallback={errFallback}>
                                <ComicsPage/>
                            </ErrorBoundary>
                        }>
                        </Route>
                        <Route path='comics/:comicId' element={
                            <ErrorBoundary fallback={errFallback}>
                                <SingleComicPage/>
                            </ErrorBoundary>
                        }>
                        </Route>
                        <Route path='testForm' element={
                            <ErrorBoundary fallback={errFallback}>
                                <TestFormPage/>
                            </ErrorBoundary>
                        }>
                        </Route>
                        <Route path='*' element={
                            <Page404/>
                        }>
                        </Route>
                    </Routes>
                    
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
