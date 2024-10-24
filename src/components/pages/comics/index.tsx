import {Helmet} from 'react-helmet';

import { useState } from 'react';
import { useDidMount } from '../../../helpers/common';

import useMarvelService from '../../../services/MarvelService';

import Spinner from '../../spinner/Spinner';
import AppBanner from '../../appBanner/AppBanner';

import { ModifiedComic } from '../../../services/MarvelService';

import ComicsList from '../../comicsList/ComicsList';

const _countOfComicsPack = 8;
let _comicsTotal = 0;

const ComicsPage = () => {
  const [comics, setComics] = useState<ModifiedComic[] | null>(null);
  const [offset, setOffset] = useState(210);
  const [isNewItemsLoading, setIsNewItemsLoading] = useState(false);
  const [isComicsEnded, setIsComicsEnded] = useState(false);

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

  const loadButton =
  <button
      className="button button__main button__long"
      disabled={isNewItemsLoading}
      style={{display: isComicsEnded ? 'none' : 'block'}}
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
