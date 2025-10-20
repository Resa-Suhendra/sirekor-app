"use client";
import { useMain } from "./hooks/use-main";

export default function MainScreen() {
    const { data } = useMain();
    return (
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}