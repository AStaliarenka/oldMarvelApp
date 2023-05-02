import { Component } from 'react';

import MarvelService from '../../services/MarvelService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

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
    loading: boolean,
    error: boolean
}

class RandomChar extends Component {
    private timerId: NodeJS.Timer | undefined = undefined;

    state: randomCharState = {
        char: {
            name: null,
            description: null,
            thumbnail: undefined,
            homepage: undefined,
            wiki: undefined
        },
        loading: true,
        error: false
    };

    private onCharLoaded = (char: any) => {
        this.setState({
            char,
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

    private marvelService = new MarvelService();

    private updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        // const id = 100; /* TEST: char with id=100 is not exist */

        this.marvelService
            .getCharacterById(id)
            .then((res) => {
                if (res) {
                    this.onCharLoaded(res);
                }
            })
            .catch((e) => {
                this.onError(e);
            });
    }

    componentDidMount(): void {
        this.updateChar();
        // const interval = 10000; /* ms */
        const interval = 5000000; /* TEST */
        this.timerId = setInterval(this.updateChar, interval);
    }

    componentWillUnmount(): void {
        clearInterval(this.timerId);
    }

    render() {
        const {char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(error || loading) ? <View char = {char}/> : null;

        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner" onClick={this.updateChar}>try it</div>
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