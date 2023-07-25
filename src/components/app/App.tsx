import {useState} from 'react';

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ComicsList from '../comicsList/ComicsList';
import SingleComic from '../singleComic/SingleComic';

import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import decoration from '../../resources/img/vision.png';

import { ModifiedComic } from '../../services/MarvelService';

const App  = () => {
    const [selectedChar, setChar] = useState<number | null>(null);
    const [selectedComic, setComic] = useState<number | null>(null);
    const [comics, setComics] = useState<ModifiedComic[] | null>(null);

    const onCharSelected = (id: number) => {
        setChar(id);
    }

    const onComicSelected = (id: number) => {
        setComic(id);
    }

    const comicData = comics?.find((comic) => comic.id === selectedComic);

    const errFallback = <p>Something went wrong</p>;
    const comicsContent = (selectedComic && comicData) ?
    <ErrorBoundary>
        <SingleComic comicId = {selectedComic} back = {setComic} comicInfo={comicData}/>
    </ErrorBoundary>
    : <ErrorBoundary>
        <ComicsList onComicSelected = {onComicSelected} comics = {comics} setComics = {setComics}/>
    </ErrorBoundary>
    
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
                {comicsContent}
            </main>
        </div>
    );
}

export default App;
