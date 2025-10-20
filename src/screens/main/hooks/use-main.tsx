"use client";
import { useEffect, useState } from "react";
import { trpc } from "@/pkg/trpc/client";

export function useMain() {
	const [data, setData] = useState();
	useEffect(() => {
		(async () => {
			try {
				const res = await trpc.api.health.$get();
				const result = await res.json();
				setData(result as any);
			} catch {
				setData(undefined);
			}
		})();
	}, []);
	return { data };
}