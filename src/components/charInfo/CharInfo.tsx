import {useCallback, useEffect, useState} from "react";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import Sceleton from "../skeleton/Skeleton";

import { character } from "../interfaces/character";

import "./charInfo.scss";

type charInfoProps = {
    charId: number | null
}

function CharInfo({charId}: charInfoProps) {
	const [char, setChar] = useState<character | null>(null);

	const {getCharacterById, clearError, process, processNames} = useMarvelService();

	const onCharLoaded = useCallback((char: Awaited<ReturnType<typeof getCharacterById>>) => {
		if (char) {
			setChar(char);
		}
		else {
			throw new Error("Undefined character");
		}
	}, []);

	useEffect(() => {
		const updateChar = async () => {
			if (!charId) {
				return;
			}
	
			clearError();
	
			const res = await getCharacterById(charId);
	
			onCharLoaded(res);
		}

		updateChar();
	}, [charId, clearError, getCharacterById, onCharLoaded]);

	const setContent = () => {
		switch (process) {
		case processNames.waiting:
			return <Sceleton/>;
		case processNames.loading:
			return <Spinner/>;
		case processNames.confirmed:
			if (char) return <View char={char}/>
			else return <Sceleton/>
		case processNames.error:
			return <ErrorMessage/>
		default:
			throw new Error("Unexpected process state");
		}
	} 

	// const mockLayout = char || loading || error ? null : <Sceleton/>;
	// const errorMessage = error ? <ErrorMessage/> : null;
	// const spinner = loading ? <Spinner/> : null;
	// const content = !(error || loading || !char) ? <View char = {char}/> : null;

	return (
		<div className="char__info">
			{/* {mockLayout}
            {errorMessage}
            {spinner}
            {content} */}
			{setContent()}
		</div>
	);
}

const View = ({char}: {char: character}) => {
	const {name, description, thumbnail, homepage, wiki, comics} = char;

	let imgStyle: React.CSSProperties = {objectFit : "cover"};

	if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
		imgStyle = {objectFit : "unset"};
	}

	return (
		<>
			<div className="char__basics">
				<img src={thumbnail} style={imgStyle} alt="abyss"/> 
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
				{comics && comics.items.length > 0 ? null : "There is no comics with this character"}
				{
					comics && comics.items.length
						? comics.items.slice(0, 9).map((item, i) => { /* 9 - is limit of count */
							const comicIdStr = item.resourceURI;
							let comicId = "";

							if (comicIdStr) {
								const indexIdStart = comicIdStr.lastIndexOf("/");

								if (indexIdStart !== -1) {
									comicId = comicIdStr.slice(indexIdStart + 1);
								}
							}

							const link = comicId
								? <Link to={`/comics/${comicId}`}>
									{item.name}
								</Link>
								: null;

							return (
								<li className="char__comics-item" key={i}>
									{link}
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
