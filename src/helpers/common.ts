import { useEffect } from "react";

const useDidMount = (func: React.EffectCallback) => {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(func, []);
}

export {useDidMount};
