import React, { useEffect } from 'react';
import { queryClient } from 'services/query';
import { AuthProvider } from 'stores/auth';
import { ThemeProvider } from 'stores/theme';
import { QueryClientProvider } from 'react-query';
import { SongQueueProvider } from 'stores/song-queue';
import Navigation from 'components/navigation';
import { LoaderProvider } from 'stores/loader';
import { StripeProvider } from '@stripe/stripe-react-native';
import { API_URL, STRIPE_KEY } from '@env';

export default function App() {
  return (
    <StripeProvider
      publishableKey={STRIPE_KEY}
      merchantIdentifier="merchant.zenbase.us"
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
