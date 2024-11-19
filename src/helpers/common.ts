import { useEffect } from "react";

const useDidMount = (func: React.EffectCallback) => {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(func, []);
}

const getBemElementClass = (blockClass: string, elementsClass: string ) => {
	if (!blockClass || !elementsClass) {
		return undefined
	}
	return `${blockClass}__${elementsClass}`
}

const generateComplicatedClassName = (...cssClassNames: string[]) => {
	if (cssClassNames.filter(className => (className === "" || className === undefined)).length) {
		return undefined
	}

	return cssClassNames.join(" ")
}

const getBemModificatorClass = (
	blockClass: string,
	elementsClass: string,
	modificatorClass: string
) => {
	if (!blockClass || !elementsClass || !modificatorClass) {
		return undefined
	}
	return `${blockClass}__${elementsClass}--${modificatorClass}`
}

export type Objectvalues<T> = T[keyof T];

export {
	useDidMount,
	getBemElementClass,
	getBemModificatorClass,
	generateComplicatedClassName
};
