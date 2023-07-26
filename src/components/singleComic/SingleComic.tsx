import './singleComic.scss';
import { ModifiedComic } from '../../services/MarvelService';

type charInfoProps = {
    comicId: number | null,
    back: React.Dispatch<React.SetStateAction<number | null>>,
    comicInfo: ModifiedComic
}

function SingleComic(props: charInfoProps) {
    const {title, description, pageCount, language, price, thumbnail} = props.comicInfo;
    const notAvailableImg = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';

    return (
        <div className="single-comic">
        <img src={thumbnail || notAvailableImg} alt="x-men" className="single-comic__img"/>
        <div className="single-comic__info">
            <h2 className="single-comic__name">{title}</h2>
            <p className="single-comic__descr">{description}</p>
            <p className="single-comic__descr">{`${pageCount} pages`}</p>
            <p className="single-comic__descr">{`Language: ${language}`}</p>
            <div className="single-comic__price">{`${price}$`}</div>
        </div>
        <div className="single-comic__back" onClick={() => {props.back(null)}}>Back to all</div>
    </div>
    );
}

export default SingleComic;