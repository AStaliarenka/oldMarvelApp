import { useState, useEffect, useRef } from 'react';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';

import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';

interface characterInfo {
    thumbnail: string;
    name: string;
    id: number;
}

type charListProps = {
    onCharSelected: (id: number) => void
}

const marvelService = new MarvelService();
const _countOfCharactersPack = 9;
let _charactersTotal = 0;

function CharList(props: charListProps) {
    const [characters, setCharacters] = useState(null);
    const [offset, setOffset] = useState(210);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isNewItemsLoading, setIsNewItemsLoading] = useState(false);
    const [isCharsEnded, setIsCharsEnded] = useState(false);

    const itemsRef = useRef<HTMLLIElement[]>([]);

    const focusOnItem = (id: number) => {
        itemsRef.current.forEach(item => item.classList.remove('char__item_selected'));
        itemsRef.current[id].classList.add('char__item_selected');
        itemsRef.current[id].focus();
    }

    function generateCharGrid(characters: characterInfo[]) {
        const charListItems = characters.map((character, i) => {
            let imgStyle = {objectFit : 'cover'};

            if (character.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {objectFit : 'unset'};
            }

            return (
                <li 
                    className="char__item"
                    tabIndex={0}
                    ref={element => {
                        if (element) {
                            itemsRef.current[i] = element
                        }
                    }}
                    key={character.id}
                    onClick={() => {
                        props.onCharSelected(character.id);
                        focusOnItem(i);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                            props.onCharSelected(character.id);
                            focusOnItem(i);
                        }
                    }}
                    >
                        {/* @ts-ignore */}
                        <img src={character.thumbnail ? character.thumbnail : abyss} alt="character" style={imgStyle}/>
                        <div className="char__name">{character.name}</div>
                </li>
            );
        });

        return (
            <ul className="char__grid">
                {charListItems}
            </ul>
        );
    }

    const onCharactersLoaded = (newCharacters: any) => {
        setCharacters(characters
            ? [
                    ...characters,
                    ...newCharacters
            ]
            : newCharacters);
        setOffset(offset + _countOfCharactersPack);
        setIsLoading(false);
        setIsNewItemsLoading(false);
    }

    const onError = (e: Error | string) => {
        console.log(e);

        setIsLoading(false);
        setHasError(true);
    }

    const loadCharacters = async (isNotFirstLoad?: boolean) => {
        if (isNotFirstLoad) {
            setIsNewItemsLoading(true);
            setIsCharsEnded(
                !((Number(_charactersTotal) - _countOfCharactersPack) > offset)
            )
        }
        else {
            setIsLoading(true)
        }

        return marvelService.getCharacters(offset, _countOfCharactersPack)
            .then(res => onCharactersLoaded(res))
            .catch((e) => {
                onError(e);
            });
    }

    useEffect(() => {
        (async () => {
            await loadCharacters();
            _charactersTotal = marvelService.charactersTotalCount;

            if (offset === (_charactersTotal - _countOfCharactersPack)) {
                setIsCharsEnded(true);
            }

        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

        const isCharDataLoaded = !(isLoading || hasError);
        const spinner = isLoading ? <Spinner/> : null;
        const charList = isCharDataLoaded && characters ? generateCharGrid(characters) : null;

        return (
            <div className="char__list">
                {spinner}
                {charList}
                <button
                    className="button button__main button__long"
                    disabled={isNewItemsLoading}
                    style={{display: isCharsEnded ? 'none' : 'block'}}
                    >
                    <div onClick={() => {loadCharacters(true)}} className="inner">
                        load more
                    </div>
                </button>
            </div>
        );
}

export default CharList;