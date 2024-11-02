import {useState} from "react";

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<void>;

export function useCopyToClipboard(): [CopiedValue, CopyFn] {
	const [copiedText, setCopiedText] = useState<CopiedValue>(null);

	const copy: CopyFn = async text => {
		try {
			await navigator.clipboard.writeText(text);
			setCopiedText(text);
		} catch (error) {
			console.warn("Copy failed", error);
			setCopiedText(null);
		}
	}

	return [copiedText, copy];
}