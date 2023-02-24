import {
  AppOpenAd,
  InterstitialAd,
  RewardedAd,
  BannerAd,
  TestIds,
} from "react-native-google-mobile-ads";
import React, { useEffect } from "react";
import { AuthProvider } from "stores/auth";
import { ThemeProvider } from "stores/theme";
import Navigation from "components/navigation";
import { LoaderProvider } from "stores/loader";
import { SongQueueProvider } from "stores/song-queue";
import * as Notifications from "helpers/notifications";
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";
import { queryClient, QueryClientProvider } from "query/client";
import { StripeProvider } from "@stripe/stripe-react-native";
import config from "./config";
import { PassiveEarningProvider } from "./stores/passiveEarning";

Notifications.init();

export default function App() {
  useEffect(() => {
    (async () => {
      const { status } = await requestTrackingPermissionsAsync();
      console.log(`Permission to track data: ${status}`);
    })();
  }, []);

  return (
    <StripeProvider
      publishableKey={config.STRIPE_KEY}
      merchantIdentifier={config.STRIPE_MERCHANT_ID} // required for Apple Pay
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <SongQueueProvider>
            <AuthProvider>
              <PassiveEarningProvider>
                <LoaderProvider>
                  <Navigation />
                </LoaderProvider>
              </PassiveEarningProvider>
            </AuthProvider>
          </SongQueueProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </StripeProvider>
  );
}
