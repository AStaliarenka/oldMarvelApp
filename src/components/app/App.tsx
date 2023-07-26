import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppHeader from "../appHeader/AppHeader";

import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import ComicsPage from '../pages/comics';
import MainPage from '../pages/main';

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
                        <Route path='comics/*' element={
                            <ErrorBoundary fallback={errFallback}>
                                <ComicsPage/>
                            </ErrorBoundary>
                        }>
                        </Route>
                    </Routes>
                    
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
