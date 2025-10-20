"use client";
import { useEffect, useState } from "react";
import { trpc } from "@/pkg/trpc/client";

export function useMain() {
	const [data, setData] = useState();
	const [id, setId] = useState('123');
	useEffect(() => {
		(async () => {
			try {
				const res = await trpc.api.resa[':id'].$get({ param: { id } });
				const result = await res.json();
				setData(result as any);
			} catch {
				setData(undefined);
			}
		})();
	}, [id]);
	return { data, setId };
}