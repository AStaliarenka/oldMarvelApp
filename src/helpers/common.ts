import { useEffect } from "react";

const useDidMount = (func: React.EffectCallback) => {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(func, []);
}

const getBemElementClass = (blockClass: string, elementsClass: string ) => {
	return `${blockClass}__${elementsClass}`
}

const getBemModificatorClass = (
	blockClass: string,
	elementsClass: string,
	modificatorClass: string
) => {
	return `${blockClass}__${elementsClass}--${modificatorClass}`
}

export type Objectvalues<T> = T[keyof T];

export {
	useDidMount,
	getBemElementClass,
	getBemModificatorClass
};
