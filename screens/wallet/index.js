import React from "react";
import { Alert, Container, Canvas, Text, Button } from "components";
import styled from 'styled-components/native';

// Import Images
import zentBackground from 'assets/images/wallet/zent-bg.png';
import zentLogo from 'assets/images/zentoken-Logo.png';
import userImageLight from 'assets/images/user-white.png';

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
  justify-content: center;
  flex-direction: column;
  align-items: center;
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

/**
 * ***********
 * ReferFriend
 * ***********
 */
const ReferFriendWrapper = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const ReferFriendBody = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ReferFriendFotter = styled.View`
  width: 100%;
  flex-direction: column;
`

const ReferFriendLogo = styled.Image`
    width: 30px;
    height: 30px;
    margin-bottom: ${props => props.theme.spacing.md}
`

/**
 * **********
 * Components
 * **********
 */

// ZentCoin Component
function ZentCoin({ tokens, usd }) {
  return <ZentWrapper source={zentBackground}>
    <ZentLogo source={zentLogo} />
    <ZentTokens>{tokens || 0} ZENT</ZentTokens>
    <ZentValue>{usd || 0} USD</ZentValue>
  </ZentWrapper>
}

// ReferFriend Component
function ReferFriend() {
  return <ReferFriendWrapper>
    <ReferFriendBody>
      <ReferFriendLogo source={userImageLight} />
      <Text fontSize='h2'>Refer a Friend</Text>
      <Text fontSize='md' style={{ marginTop: 5 }}>Invite your circle and earn 2x faster.</Text>
    </ReferFriendBody>
    <ReferFriendFotter>
      <Button title='Invite friends' block />
      <Button title='Skip' variant='secondary' block style={{ marginTop: 5 }} />
    </ReferFriendFotter>
  </ReferFriendWrapper>
}

// Wallet Component (Default)
export default function Wallet() {
  return (
    <Canvas>
      <Container style={{ flex: 1 }}>
        <ZentCoin tokens={0.01} usd={0} />
        <Alert
          title='What is Zenbase Rewards?'
          body='Those who opt-in to Zenbase Rewards can interact with content and get paid ZENT tokens. You must spend at least 5 minutes listening to content to start earning ZENT tokens. If you do not want to receive ZENT tokens you may always choose to donate them.'
        />

        <ReferFriend />
      </Container>
    </Canvas>
  );
}
