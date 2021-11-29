import React from 'react';
import { Box } from 'components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function NavigationPadding({ withSafeAreaInsets, padding = 0 }) {
    return <Box h={((withSafeAreaInsets ? useSafeAreaInsets().bottom : 0) + 50 + padding) + 'px'} />
}