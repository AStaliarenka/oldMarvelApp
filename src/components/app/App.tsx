import {Component} from 'react';

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import decoration from '../../resources/img/vision.png';

type appState = {
    selectedChar: number | null
}

class App extends Component<{}, appState> {
    state = {
        selectedChar: null
    }

    private onCharSelected = (id: number) => {
        this.setState({
            selectedChar: id
        });
    }

    render() {
        const errFallback = <p>Something went wrong</p>;

        return (
            <div className="app">
                <AppHeader/>
                <main>
                    
                    <ErrorBoundary fallback={errFallback}>
                        <RandomChar/>
                    </ErrorBoundary>
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharList onCharSelected={this.onCharSelected}/>
                        </ErrorBoundary>
                        <ErrorBoundary fallback={errFallback}>
                            <CharInfo charId={this.state.selectedChar}/>
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;
