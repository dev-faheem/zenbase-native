import { View, Text,Image,ActivityIndicator } from 'react-native'

import React, { useState, useEffect } from "react";

const SongTileImage = ({ source, ...props }) => {
    const [imageLoading, setImageLoading] = useState(true);
  
    return (
      <>
        <Image
          source={source}
          {...props}
          onLoad={() => setImageLoading(false)}
          onError={() => setImageLoading(false)}
        />
        {imageLoading && (
          <View style={{ position: "absolute", top: 0, bottom: 50, left: 0, right: 20, alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator size="small" color="white" />
          </View>
        )}
      </>
    );
  };

export default SongTileImage