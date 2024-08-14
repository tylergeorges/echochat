"use client";

import { useEffect, useRef, useState } from "react";

type CopyFn = (text: string) => Promise<boolean | Error>;

type CopiedValue = boolean;

export const useCopyToClipboard = () => {
	const [copiedText, setCopiedText] = useState(false);

	const copiedTimeoutRef = useRef<NodeJS.Timeout>();

	useEffect(() => {
		const timeout = copiedTimeoutRef.current;

		return () => {
			clearTimeout(timeout);
		};
	}, []);

	const copy: CopyFn = async (text: string) => {
		if (!navigator?.clipboard) {
			console.warn("Clipboard not supported");

			return false;
		}

		try {
			await navigator.clipboard.writeText(text);
			setCopiedText(true);

			copiedTimeoutRef.current = setTimeout(() => {
				setCopiedText(false);
			}, 1200);

			return true;
		} catch (err) {
			if (err instanceof Error) {
				console.warn("Copy failed", err);
				setCopiedText(false);

				return err;
			}

			return false;
		}
	};

	return [copiedText, copy] as [CopiedValue, CopyFn];
};
