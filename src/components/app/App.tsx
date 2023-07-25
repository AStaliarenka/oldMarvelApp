import {useState} from 'react';

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import decoration from '../../resources/img/vision.png';

import ComicsPage from '../comicsPage/ComicsPage';

const App  = () => {
    const [selectedChar, setChar] = useState<number | null>(null);

    const onCharSelected = (id: number) => {
        setChar(id);
    }

    const errFallback = <p>Something went wrong</p>;
    
    return (
        <div className="app">
            <AppHeader/>
            <main>
                {/* <ErrorBoundary fallback={errFallback}>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharSelected={onCharSelected}/>
                    </ErrorBoundary>
                    <ErrorBoundary fallback={errFallback}>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/> */}
                <ErrorBoundary fallback={errFallback}>
                    <ComicsPage/>
                </ErrorBoundary>
                
            </main>
        </div>
    );
}

export default App;
