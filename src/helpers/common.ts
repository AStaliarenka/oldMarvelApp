import { useEffect } from "react";

const useDidMount = (func: React.EffectCallback) => {
	useEffect(func, []);
}

export {useDidMount};
