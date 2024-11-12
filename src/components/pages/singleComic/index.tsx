import {Helmet} from "react-helmet";
import {useState, useEffect} from "react";

import { Link, useParams, useLocation } from "react-router-dom";

import { ModifiedComic } from "../../../services/MarvelService";
import Spinner from "../../spinner/Spinner";
import ErrorMessage from "../../errorMessage/errorMessage";

import useMarvelService from "../../../services/MarvelService";

import "./style.scss";

function SingleComicPage() {
	const notAvailableImg = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

	const {comicId} = useParams<"comicId">();
	const [comic, setComic] = useState<ModifiedComic | null>(null);
	const {getComicById, loading, error, clearError} = useMarvelService();
	const currentLocation = useLocation();

	const onComicLoaded = (comic: ModifiedComic) => {
		setComic(comic);
	}

	useEffect(() => {
		const updateComic = async () => {
			if (comicId) {
				clearError();
	
				const newComic = await getComicById(Number(comicId))
	
				if (newComic) {
					onComicLoaded(newComic);
				}
			}		
		}

		updateComic();
	}, [comicId, clearError, getComicById]);

    type viewProps = {
        comicInfo: ModifiedComic
    }

    const View = ({comicInfo}: viewProps) => {
    	const {title, description, pageCount, language, price, thumbnail} = comicInfo;

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
    			<Link to={(currentLocation.state && currentLocation.state.prevPath === "comics") ? "/comics": "/"} className="single-comic__back">Back to all</Link>
    		</div>
    	);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(error || loading || !comic) ? <View comicInfo = {comic}/> : null;

    return (
    	<>
    		<Helmet>
    			<meta name="description" content="Page with comic description" />
    			<title>Comic description</title>
    		</Helmet>
    		{errorMessage}
    		{spinner}
    		{content}
    	</>
    );
}

export default SingleComicPage;