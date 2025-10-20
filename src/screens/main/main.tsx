"use client";
import { useMain } from "./hooks/use-main";

export default function MainScreen() {
    const { data, setId } = useMain();
    return (
        <div>
            <button type="button" onClick={() => setId('456')}>Set ID</button>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}