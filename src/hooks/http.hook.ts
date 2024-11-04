import { useState, useCallback } from "react";

const PROCESS_NAMES = {
	waiting: "waiting",
	confirmed: "confirmed",
	loading: "loading",
	error: "error"
} as const;

type Objectvalues<T> = T[keyof T];

type Process = Objectvalues<typeof PROCESS_NAMES>;

export const useHttp = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<null | any>(null);
	const [process, setProcess] = useState<Process>(PROCESS_NAMES.waiting);

	const request = useCallback(async (
		url: string,
		method = "GET",
		body = null,
		headers = {}
	) => {
		setLoading(true);
		setProcess(PROCESS_NAMES.loading);

		try {
			const res = await fetch(url, {method, body, headers});

			if (!res.ok) {
				throw new Error(`Coluld not fetch ${url}, status ${res.status}`)
			}

			const data = await res.json();

			setLoading(false);

			return data;
		} catch (error: any) { /* TODO: any */
			setLoading(false);
			setError(error.message);
			setProcess(PROCESS_NAMES.error);

			throw(error);
		}
	}, []);
	/* eslint-disable */
	const requestFunc = useCallback(async <T extends Function>(func: T, params?: any) => { /* TODO: any */
		/* eslint-enable */
		setLoading(true);

		try {
			const res = await func(params);

			if (res?.status !== "Ok") {
				throw new Error("Coluld not fetch");
			}

			setLoading(false);

			return res;
		} catch (error: any) { /* TODO: any */
			setLoading(false);
			setError(error.message);

			// throw(error); /* TODO: I skip this now) */
		}
	}, []);

	const clearError = useCallback(() => {
		setError(null);
		setProcess(PROCESS_NAMES.loading); /* TODO: check is liading need here */
	}, []);

	return {
		loading,
		request,
		error,
		clearError,
		requestFunc,
		process,
		setProcess
	};
}
