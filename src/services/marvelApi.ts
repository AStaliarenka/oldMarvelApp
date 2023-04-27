import { MarvelAPI } from "marvel-ts";
import keys from "./keys";

export const marvelAPI = new MarvelAPI(keys.public);
