import React from "react";
import styled from 'styled-components/native';
import { ScrollView, Image, TouchableWithoutFeedback } from 'react-native';

// Import Images
import zentBackground from 'assets/images/wallet/zent-bg.png';
import zentLogo from 'assets/images/zentoken-Logo.png';
import expandVector from 'assets/vectors/expand.png';

// Styled Components

/**
 * *********
 * Zent Coin
 * *********
 */
 const ZentWrapper = styled.ImageBackground`
 overflow: hidden;
 border-radius: ${props => props.theme.borderRadius.lg};
 width: 100%;
 height: 250px;
 margin-top: ${props => props.theme.spacing.md};
 margin-bottom: ${props => props.theme.spacing.md};
 justify-content: center;
 flex-direction: column;
 align-items: center;
`

const ZentExpandIconWrapper = styled.View`
 position: absolute;
 top: 10;
 right: 10;
 flex-direction: row-reverse;
 width: 100%;
`

const ZentLogo = styled.Image`
 width: 100px;
 height: 100px;
`

const ZentTokens = styled.Text`
 font-size: ${props => props.theme.fontSize.h1};
 color: ${props => props.theme.color.header};
 font-weight: bold;
 margin-top: ${props => props.theme.spacing.md};
`

const ZentValue = styled.Text`
 font-size: ${props => props.theme.fontSize.xl};
 color: ${props => props.theme.color.header};
`

// ZentCoin Component
export default function ZentTokenBanner({ tokens, usd, onPress = null }) {
    return <TouchableWithoutFeedback onPress={onPress}>
      <ZentWrapper source={zentBackground}>
        {onPress && <ZentExpandIconWrapper>
          <Image source={expandVector} style={{ width: 16, height: 16 }} />
        </ZentExpandIconWrapper>}
        <ZentLogo source={zentLogo} />
        <ZentTokens>{tokens || 0} ZENT</ZentTokens>
        <ZentValue>{usd || 0} USD</ZentValue>
      </ZentWrapper>
    </TouchableWithoutFeedback>
  }