"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const queryClient = new QueryClient();
export function ProviderTanstack({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <main>{children}</main>
      <ReactQueryDevtools initialIsOpen={false} position="left" />
    </QueryClientProvider>
  );
}
