import { useState, useEffect } from 'react';

import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';

import Spinner from '../spinner/Spinner';

import abyss from '../../resources/img/abyss.jpg';

import { ModifiedComic } from '../../services/MarvelService';

type comicsListProps = {
    onComicSelected: (id: number) => void;
    comics: ModifiedComic[] | null;
    setComics: React.Dispatch<React.SetStateAction<ModifiedComic[] | null>>
}

const _countOfComicsPack = 8;
let _comicsTotal = 0;

const ComicsList = (props: comicsListProps) => {
    // const [comics, setComics] = useState(null);
    const [offset, setOffset] = useState(210);
    const [isNewItemsLoading, setIsNewItemsLoading] = useState(false);
    const [isComicsEnded, setIsComicsEnded] = useState(false);

    const {getComics, getComicsTotalCount, error, loading} = useMarvelService();

    function generateComicsGrid(comics: ModifiedComic[]) {
        const comicsListItems = comics.map((comic, i) => {
            let imgStyle = {objectFit : 'cover'};

            if (comic.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {objectFit : 'unset'};
            }

            return (
                <li 
                    className="comics__item"
                    tabIndex={0}
                    // ref={element => {
                    //     if (element) {
                    //         itemsRef.current[i] = element
                    //     }
                    // }}
                    key={comic.id}
                    onClick={() => {
                        if (comic.id) {
                            props.onComicSelected(comic.id);
                        }
                        // focusOnItem(i);
                    }}
                    // onKeyDown={(e) => {
                    //     if (e.key === ' ' || e.key === 'Enter') {
                    //         props.onComicSelected(comic.id);
                    //         focusOnItem(i);
                    //     }
                    // }}
                    >
                        {/* @ts-ignore */}
                        <a href="/#">
                        {/* @ts-ignore */}
                        <img src={comic.thumbnail ? comic.thumbnail : abyss} alt="comic" className="comics__item-img" style={imgStyle}/>
                        <div className="comics__item-name">{comic.title}</div>
                        <div className="comics__item-price">NOT AVAILABLE</div>
                    </a>
                </li>
            );
        });

        return (
            <ul className="comics__grid">
                {comicsListItems}
            </ul>
        );
    }

    const onComicsLoaded = (newComics: any) => {
        props.setComics(props.comics
            ? [
                    ...props.comics,
                    ...newComics
            ]
            : newComics);
        setOffset(offset + _countOfComicsPack);
        setIsNewItemsLoading(false);
    }

    const loadComics = async (isNotFirstLoad?: boolean) => {
        if (isNotFirstLoad) {
            setIsNewItemsLoading(true);
            setIsComicsEnded(
                !((Number(_comicsTotal) - _countOfComicsPack) > offset)
            )
        }

        // TODO: scroll down after loading

        return getComics(offset, _countOfComicsPack)
            .then(onComicsLoaded);
    }

    useEffect(() => {
        (async () => {
            await loadComics();
            _comicsTotal = getComicsTotalCount();

            if (offset === (_comicsTotal - _countOfComicsPack)) {
                setIsComicsEnded(true);
            }

        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const spinner = (loading && !isNewItemsLoading) ? <Spinner/> : null;
    const comicsList = (props.comics && !error) ? generateComicsGrid(props.comics) : null;

    return (
        <div className="comics__list">
                {spinner}
                {comicsList}
                <button
                    className="button button__main button__long"
                    disabled={isNewItemsLoading}
                    style={{display: isComicsEnded ? 'none' : 'block'}}
                    >
                    <div onClick={() => {loadComics(true)}} className="inner">
                        load more
                    </div>
                </button>
            </div>
    );
}

export default ComicsList;