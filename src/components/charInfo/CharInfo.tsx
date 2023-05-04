import {Component} from 'react';

import MarvelService from '../../services/MarvelService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import Sceleton from '../skeleton/Skeleton';

import { character } from '../interfaces/character';

import './charInfo.scss';

type charInfoProps = {
    charId: number | null
}

type charInfoState = {
    loading: boolean,
    error: boolean,
    char: character | null
}

class CharInfo extends Component<charInfoProps, charInfoState> {
    state = {
        loading: false,
        error: false,
        char: null
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps: Readonly<charInfoProps>, prevState: Readonly<charInfoState>, snapshot?: any): void {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    service = new MarvelService();

    private updateChar = () => {
        const {charId} = this.props;

        if (!charId) {
            return;
        }

        this.onCharLoading();

        this.service.getCharacterById(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    private onCharLoaded = (char: any) => {
        this.setState({
            char,
            loading: false
        });
    }

    private onCharLoading = () => {
        this.setState({
            loading: true
        });
    }

    private onError = (e: any) => {
        console.log(e);

        this.setState({
            loading: false,
            error: true
        });
    }

    render() {
        const {char, loading, error} = this.state;

        const mockLayout = char || loading || error ? null : <Sceleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(error || loading || !char) ? <View char = {char}/> : null;

        return (
            <div className="char__info">
                {mockLayout}
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

const View = ({char}: {char: character}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss"/>
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
                {
                    comics
                        ? comics.items.map((item, i) => {
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