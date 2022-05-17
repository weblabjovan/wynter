import { render, RenderOptions } from "@testing-library/react";
import { ComponentType, ReactElement, ReactNode } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { AuthProvider } from "../hooks/useAuth";

const testQueryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={testQueryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};

const appRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AppProviders as ComponentType, ...options })


// eslint-disable-next-line import/no-extraneous-dependencies
export * from "@testing-library/react"

export { appRender }

