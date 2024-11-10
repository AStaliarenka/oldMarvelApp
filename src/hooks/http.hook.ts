import { useState, useCallback } from "react";

import { Objectvalues } from "../helpers/common";

const PROCESS_NAMES = {
	waiting: "waiting",
	confirmed: "confirmed",
	loading: "loading",
	error: "error"
} as const;

type Process = Objectvalues<typeof PROCESS_NAMES>;

const getErrorMessage = (error: unknown) => {
	if (error instanceof Error) {
		return error.message
	} else return "Something went wrong";
	// } else return String(error);
}

export const useHttp = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null); /* rename to errorMessage */
	const [process, setProcess] = useState<Process>(PROCESS_NAMES.waiting);

	// const request = async (
	// 	url: string,
	// 	method = "GET",
	// 	body = null,
	// 	headers = {}
	// ) => {
	// 	setLoading(true);
	// 	setProcess(PROCESS_NAMES.loading);

	// 	try {
	// 		const res = await fetch(url, {method, body, headers});

	// 		if (!res.ok) {
	// 			throw new Error(`Coluld not fetch ${url}, status ${res.status}`)
	// 		}

	// 		const data = await res.json();

	// 		setLoading(false);
	// 		setProcess(PROCESS_NAMES.confirmed); /* if fetch error we also need to confirm process */

	// 		return data;
	// 	} catch (error: unknown) {
	// 		setLoading(false);
	// 		setError(getErrorMessage(error));
	// 		setProcess(PROCESS_NAMES.error);
	// 		// throw(error); /* TODO: I skip this now) */
	// 	}
	// };

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const requestFunc = useCallback(async <T extends (...args: any[]) => any>( /* TODO: refactor */
		func: T,
		...params: Parameters<T>
	): Promise<Awaited<ReturnType<T>> | undefined> => {

		setLoading(true);
		setProcess(PROCESS_NAMES.loading);

		try {
			const res = await func(...params);

			if (res?.status !== "Ok") {
				throw new Error("Coluld not fetch");
			}

			setLoading(false);
			setProcess(PROCESS_NAMES.confirmed); /* if fetch error we also need to confirm process */

			return res;
		} catch (error: unknown) {
			setLoading(false);
			setError(getErrorMessage(error));
			setProcess(PROCESS_NAMES.error);
			// throw(error); /* TODO: I skip this now) */
		}
	}, []);

	const clearError = useCallback(() => {
		setError(null);
	}, []);

	return {
		loading,
		// request,
		error,
		setError,
		clearError,
		requestFunc,
		process,
		setProcess,
		processNames: PROCESS_NAMES
	};
}
