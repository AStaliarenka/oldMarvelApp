import { useState } from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import { useDidMount } from "../../helpers/common";
import { ModifiedCharacterDescription } from "../../services/MarvelService";

import "./randomChar.scss";

import mjolnir from "../../resources/img/mjolnir.png";

function RandomChar() {
	const {error, loading, getCharacterById, clearError} = useMarvelService();

	const [character, setCharacter] = useState<Awaited<ReturnType<typeof getCharacterById>> | null>(null);

	const onCharLoaded = (char: Awaited<ReturnType<typeof getCharacterById>>) => {
		if (char) setCharacter(char);
	};

	const updateChar = async () => {
		clearError();

		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

		onCharLoaded(await getCharacterById(id))
	};

	// const updateChar = useCallback(async (incorrectId?: number) => {
	// 	clearError();

	// 	if (incorrectId) {
	// 		onCharLoaded(await getCharacterById(incorrectId))
	// 	}
	// 	else {
	// 		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
	// 		// const id = 100; /* TEST: char with id=100 is not exist */
	
	// 		onCharLoaded(await getCharacterById(id))
	// 	}
		
	// }, []);

	// useEffect(() => {
	// 	updateChar(100);
	// }, []);

	const handleUpdateChar = () => {
		updateChar();
	}

	useDidMount(() => {
		updateChar();

		const interval = 500000; /* TEST */
		// const interval = 5000;
		const timerId = setInterval(updateChar, interval) as NodeJS.Timeout;

		return () => {
			clearInterval(timerId);
		}
	});

	const errorMessage = error ? <ErrorMessage/> : null;
	const spinner = loading ? <Spinner/> : null;
	const content = !(error || loading) && character ? <View char = {character}/> : null;

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
					<div className="inner" onClick={handleUpdateChar}>try it</div>
				</button>
				<img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
			</div>
		</div>
	)
}

const View = ({char}: {char: ModifiedCharacterDescription}) => {
	const {name, description, thumbnail, homepage, wiki} = char;

	let imgStyle: React.CSSProperties = {objectFit : "cover"};

	if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
		imgStyle = {objectFit : "unset"};
	}

	return (
		<div className="randomchar__block">
			<img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
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