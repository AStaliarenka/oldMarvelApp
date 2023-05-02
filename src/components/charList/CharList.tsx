import { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';

import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';

interface characterInfo {
    thumbnail: string,
    name: string,
    id: number
}
interface charactersState {
    characters: characterInfo[] | null,
    loading: boolean,
    error: boolean
}

class CharList extends Component {
    state: charactersState = {
        characters: null,
        loading: true,
        error: false
    }

    private offset = 120; /* offset in character list */

    private generateCharGrid(characters: characterInfo[]) {
        const charListItems = characters.map((character) => {
            let imgStyle = {objectFit : 'cover'};

            if (character.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {objectFit : 'unset'};
            }

            return (
                <li className="char__item" key={character.id}>
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

    private onCharactersLoaded(characters: any) {
        this.setState({
            characters,
            loading: false
        });
    }

    private onError = (e: Error | string) => {
        console.log(e);

        this.setState({
            loading: false,
            error: true
        });
    }

    private loadCharacters = () => {
        const service = new MarvelService();

        service.getCharacters(this.offset)
            .then(res => this.onCharactersLoaded(res))
            .catch((e) => {
                this.onError(e);
            });
    }

    componentDidMount(): void {
        this.loadCharacters();
    }

    render() {
        const {characters, loading, error} = this.state;
        const isCharDataLoaded = !(loading || error);
        const spinner = loading ? <Spinner/> : null;
        const charList = isCharDataLoaded && characters ? this.generateCharGrid(characters) : null;

        return (
            <div className="char__list">
                {spinner}
                {charList}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

export default CharList;