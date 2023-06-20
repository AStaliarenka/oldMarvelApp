import {useEffect, useState} from 'react';

import MarvelService from '../../services/MarvelService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import Sceleton from '../skeleton/Skeleton';

import { character } from '../interfaces/character';

import './charInfo.scss';

type charInfoProps = {
    charId: number | null
}

const marvelService = new MarvelService();

function CharInfo(props: charInfoProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [char, setChar] = useState(null);

    useEffect(() => {
        updateChar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        updateChar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.charId]);

    const updateChar = () => {
        const {charId} = props;

        if (!charId) {
            return;
        }

        onCharLoading();

        marvelService.getCharacterById(charId)
            .then(onCharLoaded)
            .catch(onError);
    }

    const onCharLoaded = (char: any) => {
        setChar(char);
        setIsLoading(false);
    }

    const onCharLoading = () => {
        setIsLoading(true);
    }

    const onError = (e: any) => {
        console.log(e);

        setIsLoading(false);
        setHasError(true);
    }

    const mockLayout = char || isLoading || hasError ? null : <Sceleton/>;
    const errorMessage = hasError ? <ErrorMessage/> : null;
    const spinner = isLoading ? <Spinner/> : null;
    const content = !(hasError || isLoading || !char) ? <View char = {char}/> : null;

    return (
        <div className="char__info">
            {mockLayout}
            {errorMessage}
            {spinner}
            {content}
        </div>
    );
}

const View = ({char}: {char: character}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;

    let imgStyle = {objectFit : 'cover'};

    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {objectFit : 'unset'};
    }

    return (
        <>
            <div className="char__basics">
                {/* @ts-ignore */}
                <img src={thumbnail} style={imgStyle} alt="abyss"/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics && comics.items.length > 0 ? null : 'There is no comics with this character'}
                {
                    comics && comics.items.length
                        ? comics.items.slice(0, 9).map((item, i) => { /* 9 - is limit of count */
                            return (
                                <li className="char__comics-item" key={i}>
                                    {item.name}
                                </li>
                            )
                        })
                        : null
                }
            </ul>
        </>
    );
}

export default CharInfo;
