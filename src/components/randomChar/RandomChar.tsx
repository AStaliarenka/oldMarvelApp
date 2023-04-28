import { Component } from 'react';

import MarvelService from '../../services/MarvelService';

import Spinner from '../spinner/Spinner';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

interface charState {
    name: string | null,
    description: string | null,
    thumbnail: string | undefined,
    homepage: string | undefined,
    wiki: string | undefined
}

interface randomCharState {
    char: charState,
    loading: true
}

class RandomChar extends Component {
    // TODO: fix load data
    constructor(props: any) {
        super(props);
        this.updateChar();
    }

    state: randomCharState = {
        char: {
            name: null,
            description: null,
            thumbnail: undefined,
            homepage: undefined,
            wiki: undefined
        },
        loading: true
    };

    onCharLoaded = (char: any) => {
        this.setState({char, loading: false});
    }

    private marvelService = new MarvelService();

    private updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

        this.marvelService
            .getCharacterById(id)
            .then((res) => {
                if (res) {
                    this.onCharLoaded(res);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        const {char, loading} = this.state;

        return (
            <div className="randomchar">
                {loading ? <Spinner/> : <View char = {char}/>}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}: any) => {
    const {name, description, thumbnail, homepage, wiki} = char;

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default RandomChar;