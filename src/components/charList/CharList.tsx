import { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';

import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';

interface characterInfo {
    thumbnail: string;
    name: string;
    id: number;
}
type charactersState = {
    characters: characterInfo[] | null;
    loading: boolean;
    error: boolean;
    newItemsLoading: boolean;
    offset: number;
    isCharsEnded: boolean;
}

type charListProps = {
    onCharSelected: (id: number) => void
}

class CharList extends Component<charListProps, charactersState> {
    state: charactersState = {
        characters: null,
        loading: true,
        error: false,
        newItemsLoading: false,
        offset: 210, /* offset in character list */
        isCharsEnded: false
    }

    private service = new MarvelService();

    private _charactersTotal: number | undefined;

    private generateCharGrid(characters: characterInfo[]) {
        const charListItems = characters.map((character) => {
            let imgStyle = {objectFit : 'cover'};

            if (character.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {objectFit : 'unset'};
            }

            return (
                <li 
                    className="char__item"
                    key={character.id}
                    onClick={() => this.props.onCharSelected(character.id)}>
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

    private onCharactersLoaded(newCharacters: any) {
        this.setState(({characters, offset}) => {
            return {
                characters: characters
                    ? [
                            ...characters,
                            ...newCharacters
                    ]
                    : newCharacters,
                loading: false,
                newItemsLoading: false,
                offset: offset + 9
            }
        });
    }

    private onError = (e: Error | string) => {
        console.log(e);

        this.setState({
            loading: false,
            error: true
        });
    }

    private loadCharacters = async (isNotFirstLoad?: boolean) => {
        if (isNotFirstLoad) {
            this.setState({
                newItemsLoading: true,
                isCharsEnded: !((Number(this._charactersTotal) - 9) > this.state.offset)
            });
        }
        else {
            this.setState({
                loading: true
            });
        }

        return this.service.getCharacters(this.state.offset)
            .then(res => this.onCharactersLoaded(res))
            .catch((e) => {
                this.onError(e);
            });
    }

    async componentDidMount() {
        await this.loadCharacters();

        this._charactersTotal = this.service.charactersTotalCount;
    }

    render() {
        const {characters, loading, error, newItemsLoading, isCharsEnded} = this.state;
        const isCharDataLoaded = !(loading || error);
        const spinner = loading ? <Spinner/> : null;
        const charList = isCharDataLoaded && characters ? this.generateCharGrid(characters) : null;

        return (
            <div className="char__list">
                {spinner}
                {charList}
                <button
                    className="button button__main button__long"
                    disabled={newItemsLoading}
                    style={{display: isCharsEnded ? 'none' : 'block'}}
                    >
                    <div onClick={() => {this.loadCharacters(true)}} className="inner">
                        load more
                    </div>
                </button>
            </div>
        );
    }
}

export default CharList;