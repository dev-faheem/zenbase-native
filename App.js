import React from "react";
import { queryClient } from "services/query";
import { AuthProvider } from "stores/auth";
import { ThemeProvider } from "stores/theme";
import { QueryClientProvider } from "react-query";
import Navigation from "components/navigation";
import { LoaderProvider } from "stores/loader";
import { StripeProvider } from "@stripe/stripe-react-native";
import config from "./config";
import { SongQueueProvider } from "stores/song-queue";

export default function App() {
  return (
    <StripeProvider
      publishableKey={config.STRIPE_KEY}
      merchantIdentifier={config.STRIPE_MERCHANT_ID}
    >
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <SongQueueProvider>
            <AuthProvider>
              <LoaderProvider>
                <Navigation />
              </LoaderProvider>
            </AuthProvider>
          </SongQueueProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </StripeProvider>
  );
}
