import React from "react";
import { queryClient } from "services/query";
import { AuthProvider } from "stores/auth";
import { ThemeProvider } from "stores/theme";
import { QueryClientProvider } from "react-query";
import Navigation from "components/navigation";

export default function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
