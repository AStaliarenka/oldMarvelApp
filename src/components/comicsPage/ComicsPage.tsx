import { useState } from 'react';
import { useDidMount } from '../../helpers/common';

import useMarvelService from '../../services/MarvelService';

import Spinner from '../spinner/Spinner';

import { ModifiedComic } from '../../services/MarvelService';

import ComicsList from '../comicsList/ComicsList';
import SingleComic from '../singleComic/SingleComic';

const _countOfComicsPack = 8;
let _comicsTotal = 0;

const ComicsPage = () => {
  const [selectedComic, setComic] = useState<number | null>(null);
  const [comics, setComics] = useState<ModifiedComic[] | null>(null);
  const [offset, setOffset] = useState(210);
  const [isNewItemsLoading, setIsNewItemsLoading] = useState(false);
  const [isComicsEnded, setIsComicsEnded] = useState(false);

  const onComicSelected = (id: number) => {
    setComic(id);
  }

  const {getComics, getComicsTotalCount, error, loading} = useMarvelService();

  const onComicsLoaded = (newComics: any) => {
      setComics(comics
          ? [
                  ...comics,
                  ...newComics
          ]
          : newComics);
      setOffset(offset + _countOfComicsPack);
      setIsNewItemsLoading(false);
  }

  const loadComics = async (isNotFirstLoad?: boolean) => {
      if (isNotFirstLoad) {
          setIsNewItemsLoading(true);
          setIsComicsEnded(
              !((Number(_comicsTotal) - _countOfComicsPack) > offset)
          )
      }

      // TODO: scroll down after loading

      return getComics(offset, _countOfComicsPack)
          .then(onComicsLoaded);
  }

  useDidMount(() => {
    const loadComicsFunc = async () => {
      await loadComics();
      _comicsTotal = getComicsTotalCount();
  
      if (offset === (_comicsTotal - _countOfComicsPack)) {
          setIsComicsEnded(true);
      }
    }

    loadComicsFunc();
});

  const loadButton = <button
    className="button button__main button__long"
    disabled={isNewItemsLoading}
    style={{display: isComicsEnded ? 'none' : 'block'}}
    >
    <div onClick={() => {loadComics(true)}} className="inner">
        load more
    </div>
  </button>;

  const spinner = (loading && !isNewItemsLoading) ? <Spinner/> : null;
  const comicsList = (comics && !error)
    ? <ComicsList onComicSelected = {onComicSelected} comics = {comics}/>
    : null;

  const comicData = comics?.find((comic) => comic.id === selectedComic);

  const comicsContent = (selectedComic && comicData) ?
    <SingleComic comicId = {selectedComic} back = {setComic} comicInfo={comicData}/>
    : comicsList

  return (
    <div className="comics">
      {comicsContent}
      {spinner}
      {loadButton}
    </div>
  );
}

export default ComicsPage;
