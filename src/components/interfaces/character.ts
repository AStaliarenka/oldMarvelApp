import { ComicList } from "marvel-ts/dist/types";

type character = {
	name: string;
    description: string;
	homepage: string;
	wiki: string;
	thumbnail: string;
	comics: ComicList | undefined
}

export type {character};
