import {Helmet} from "react-helmet";

import { useState } from "react";
import { useDidMount } from "../../../helpers/common";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux.hooks";
import { setStartComicsPack } from "../../../app/reducers/marvel";

import useMarvelService from "../../../services/MarvelService";

import Spinner from "../../spinner/Spinner";
import AppBanner from "../../appBanner/AppBanner";

import ComicsList from "../../comicsList/ComicsList";

const _countOfComicsPack = 8;
let _comicsTotal = 0;

const ComicsPage = () => {
	const [comics, setComics] = useState<Awaited<ReturnType<typeof getComics>> | null>(null);
	const [offset, setOffset] = useState(210);
	const [isNewItemsLoading, setIsNewItemsLoading] = useState(false);
	const [isComicsEnded, setIsComicsEnded] = useState(false);

	const dispatch = useAppDispatch();
	const startComicsPack = useAppSelector((state) => state.marvel.comics);

	const {getComics, getComicsTotalCount, error, loading} = useMarvelService();

	const loadComics = async (isNotFirstLoad?: boolean) => {
		const newComics = await getComics(offset, _countOfComicsPack);

		if (isNotFirstLoad) {
			setIsNewItemsLoading(true);
			setIsComicsEnded(
				!((Number(_comicsTotal) - _countOfComicsPack) > offset)
			)
		}
		else if (!startComicsPack && newComics) {
			dispatch(setStartComicsPack(newComics))
		}

		// TODO: scroll down after loading

		if (newComics) {
			setComics(comics
				? [
					...comics,
					...newComics
				]
				: newComics);
			setOffset(offset + _countOfComicsPack);
			setIsNewItemsLoading(false);
		}
	}

	useDidMount(() => {
		const loadComicsFunc = async () => {
			if (startComicsPack) {
				setComics(startComicsPack);
				setOffset(offset + _countOfComicsPack);
			}
			else {
				await loadComics();
			}

			_comicsTotal = getComicsTotalCount();
		}

		loadComicsFunc();
	});

	const loadButton =
		<button
			className="button button__main button__long"
			disabled={isNewItemsLoading}
			style={{display: isComicsEnded ? "none" : "block"}}
		>
			<div onClick={() => {loadComics(true)}} className="inner">
				load more
			</div>
		</button>;

	const spinner = (loading) ? <Spinner/> : null;
	const comicsList = (comics && !error)
		? <ComicsList comics = {comics}/>
		: null;

	return (
		<div className="comics">
			<Helmet>
				<meta name="description" content="Page with list of comics" />
				<title>Comics page</title>
			</Helmet>
			<AppBanner/>
			{comicsList}
			{spinner}
			{loadButton}
		</div>
	);
}

export default ComicsPage;
