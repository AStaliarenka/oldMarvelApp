import {useState} from 'react';

import ErrorBoundary from '../../errorBoundary/ErrorBoundary';
import RandomChar from '../../randomChar/RandomChar';
import CharList from '../../charList/CharList';
import CharInfo from '../../charInfo/CharInfo';
import decoration from '../../../resources/img/vision.png';

const MainPage = () => {
    const errFallback = <p>Something went wrong</p>;

    const [selectedChar, setChar] = useState<number | null>(null);

    const onCharSelected = (id: number) => {
        setChar(id);
    }

    return (
        <div className='char'>
            <ErrorBoundary fallback={errFallback}>
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
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </div>
    );
}

export default MainPage;