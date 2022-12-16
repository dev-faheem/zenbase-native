import { Image } from "react-native";

export const prefetchCategoryArtwork = (category) => {
  Image.prefetch("https://opt.moovweb.net?quality=30&img=" + category?.artwork);
};

export const prefetchSongArtwork = (song) => {
  Image.prefetch("https://opt.moovweb.net?quality=50&img=" + song?.artwork);
};
