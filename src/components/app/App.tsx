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
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList onCharSelected={this.onCharSelected}/>
                        <ErrorBoundary fallback={<p>Something went wrong</p>}>
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
