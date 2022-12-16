import React, { useEffect } from "react";
import { AuthProvider } from "stores/auth";
import { ThemeProvider } from "stores/theme";
import Navigation from "components/navigation";
import { LoaderProvider } from "stores/loader";
import { SongQueueProvider } from "stores/song-queue";
import * as Notifications from "helpers/notifications";
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";
import { queryClient, QueryClientProvider } from "query/client";

Notifications.init();

export default function App() {
  useEffect(() => {
    (async () => {
      const { status } = await requestTrackingPermissionsAsync();
      console.log(`Permission to track data: ${status}`);
    })();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SongQueueProvider>
          <AuthProvider>
            <LoaderProvider>
              <Navigation />
            </LoaderProvider>
          </AuthProvider>
        </SongQueueProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
