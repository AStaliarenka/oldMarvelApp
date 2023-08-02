import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppHeader from "../appHeader/AppHeader";

import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import { MainPage, ComicsPage, Page404, SingleComicPage, TestFormPage } from '../pages';

import AppContainer from '../appContainer';

const App  = () => {
    const errFallback = <p>Something went wrong</p>;
    
    return (
        <BrowserRouter>
            <div className="app">
                <AppContainer>
                    <AppHeader/>
                </AppContainer>   
                <main>
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
                        <Route path='*' element={
                            <AppContainer>
                                <Page404/>
                            </AppContainer>
                        }>
                        </Route>
                    </Routes>   
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
