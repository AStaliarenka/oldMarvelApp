import { useState, useCallback } from "react";

export const useHttp = () => {
	const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | any>(null);

	const request = useCallback(async (
		url: string,
		method = 'GET',
		body = null,
		headers = {}
	) => {
			setLoading(true);

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

				throw(error);
			}
	}, []);

	const clearError = useCallback(() => setError(null), []);

	return {
		loading,
		request,
		error,
		clearError
	};
}
