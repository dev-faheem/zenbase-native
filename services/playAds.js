import { AdMobInterstitial } from 'expo-ads-admob';
import { GOOGLE_ADMOB_ADUNIT } from '@env';

export const playAds = async (
  count,
  onAdPlayed = () => {},
  onFinalAdPlayed = () => {}
) => {
  return;
  try {
    let played = 1;
    await AdMobInterstitial.setAdUnitID(GOOGLE_ADMOB_ADUNIT);
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
    await AdMobInterstitial.showAdAsync();

    AdMobInterstitial.addEventListener('interstitialDidClose', async (e) => {
      if (count > 1 && played < count) {
        await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
        await AdMobInterstitial.showAdAsync();
        onAdPlayed?.(played);
        played++;
      }
    });
  } catch (e) {
    console.error(e);
  }
};
