import type { PropsWithChildren } from "react";
import UILayout from "@/components/layouts/ui.layout";

export default function Layout({ children }: PropsWithChildren) {
    return <UILayout>{children}</UILayout>
}