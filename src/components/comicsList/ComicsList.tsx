import './comicsList.scss';

import abyss from '../../resources/img/abyss.jpg';

import { ModifiedComic } from '../../services/MarvelService';

type comicsListProps = {
    onComicSelected: (id: number) => void;
    comics: ModifiedComic[];
}

const ComicsList = (props: comicsListProps) => {
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
                    key={i} /* TODO: ID*/
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

    const comicsList = generateComicsGrid(props.comics);

    return (
        <div className="comics__list">
                {comicsList}
            </div>
    );
}

export default ComicsList;