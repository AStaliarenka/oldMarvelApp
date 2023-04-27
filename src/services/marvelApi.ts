import { MarvelAPI } from "marvel-ts";
import keys from "./keys";

export const marvelService = new MarvelAPI(keys.public);
