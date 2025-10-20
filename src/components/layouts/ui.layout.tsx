import type { PropsWithChildren } from "react";

export default function UILayout({ children }: PropsWithChildren) {
    return (
        <div>
            <div className="max-w-4xl mx-auto bg-red-300 min-h-screen">
                {children}
            </div>
        </div>
    )
}