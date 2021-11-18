import React, { useState } from "react";
import { Alert, Container, Canvas, Text, Button, ZentTokenBanner, Box } from 'components';
import { ReactNativeShare } from 'helpers';
import styled from 'styled-components/native';
import { ScrollView, Image } from 'react-native';

// Import Icons
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import wallpaper1 from 'assets/images/wallpapers/wallpaper-1.png';
import wallpaper2 from 'assets/images/wallpapers/wallpaper-2.png';
import wallpaper3 from 'assets/images/wallpapers/wallpaper-3.png';
import wallpaper4 from 'assets/images/wallpapers/wallpaper-4.png';


/**
 * *********************************************
 * Wallet Information (Refer a friend & History)
 * *********************************************
 */
const WalletInfoWrapper = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const WalletInfoBody = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const WalletInfoFooter = styled.View`
  width: 100%;
  flex-direction: column;
  padding-bottom: ${props => props.theme.spacing.lg};
`

const WalletInfoLogo = styled.Image`
    width: 30px;
    height: 30px;
    margin-bottom: ${props => props.theme.spacing.md};
`

/**
 * *******************
 * Wallet History List
 * *******************
 */
const WalletHistoryList = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md};
  padding-left: ${props => props.theme.spacing.xxl};
  padding-right: ${props => props.theme.spacing.xxl};
  background-color: ${props => props.theme.color.hud};
  border-radius: ${props => props.theme.borderRadius.lg};
`

const WalletHistoryListText = styled.View``

const WalletHistoryListThumbnail = styled.Image`
  width: 78px;
  height: 78px;
  border-radius: ${props => props.theme.borderRadius.lg};
`

/**
 * **********
 * Components
 * **********
 */
// ReferFriend Component
function ReferFriend({ setDisplay }) {
  // Invite Friend (React Native Share)
  const inviteFriend = (message) => {
    ReactNativeShare(
      message,
      () => {
        // Shared
      },
      () => {
        // Dismissed
      },
      (err) => {
        // Error
      }
    );
  }

  const user = {
    fullname: 'Rupinder Singh'
  }

  return <WalletInfoWrapper>
    <WalletInfoBody>
      <FontAwesome name='user-circle-o' size={34} style={{ marginBottom: 12 }} color='white' />
      <Text fontSize='h2'>Refer a Friend</Text>
      <Text fontSize='md' style={{ marginTop: 5 }}>Invite your circle and earn 2x faster.</Text>
    </WalletInfoBody>
    <WalletInfoFooter>
      <Button title='Invite friends' block onPress={() => inviteFriend(`${user.fullname} is inviting you to meditate with him/her. \n\nJoin Here: https://zenbase.us`)} />
      <Box h='10px' />
      <Button title='Skip' variant='secondary' block onPress={() => setDisplay(false)} />
    </WalletInfoFooter>
  </WalletInfoWrapper>
}

// Histroy List
function HistoryList() {
  return <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
    {/* Wallet History List */}
    <WalletHistoryList>
      <WalletHistoryListText>
        <Text fontSize='lg'>Our Purpose Has Presence</Text>
        <Text fontSize='md' style={{ marginTop: 2 }} color='secondary'>Damon</Text>
        <Text fontSize='md' style={{ marginTop: 10 }} color='primary'>5 minutes • 0.01 ZENT</Text>
      </WalletHistoryListText>
      <WalletHistoryListThumbnail source={wallpaper1} resizeMode='cover' />
    </WalletHistoryList>

    <WalletHistoryList>
      <WalletHistoryListText>
        <Text fontSize='lg'>Move Mountain</Text>
        <Text fontSize='md' style={{ marginTop: 2 }} color='secondary'>Super Seeker</Text>
        <Text fontSize='md' style={{ marginTop: 10 }} color='primary'>10 minutes • 0.02 ZENT</Text>
      </WalletHistoryListText>
      <WalletHistoryListThumbnail source={wallpaper2} resizeMode='cover' />
    </WalletHistoryList>

    <WalletHistoryList>
      <WalletHistoryListText>
        <Text fontSize='lg'>Let Go</Text>
        <Text fontSize='md' style={{ marginTop: 2 }} color='secondary'>Freestyle</Text>
        <Text fontSize='md' style={{ marginTop: 10 }} color='primary'>5 minutes • 0.01 ZENT</Text>
      </WalletHistoryListText>
      <WalletHistoryListThumbnail source={wallpaper3} resizeMode='cover' />
    </WalletHistoryList>

    <WalletHistoryList>
      <WalletHistoryListText>
        <Text fontSize='lg'>Wisdom of The Ancients</Text>
        <Text fontSize='md' style={{ marginTop: 2 }} color='secondary'>Master Chadd</Text>
        <Text fontSize='md' style={{ marginTop: 10 }} color='primary'>15 minutes • 0.03 ZENT</Text>
      </WalletHistoryListText>
      <WalletHistoryListThumbnail source={wallpaper4} resizeMode='cover' />
    </WalletHistoryList>

    {/* Wallet History List - End*/}
  </ScrollView>
}

// History Component
function History() {
  return <WalletInfoWrapper>
    {/* <HistoryList /> */}
    <WalletInfoBody>
      <MaterialCommunityIcons name="clock-time-nine" size={40} color='white' style={{ marginBottom: 6 }} />
      <Text fontSize='h2'>History</Text>
      <Text fontSize='md' style={{ marginTop: 5 }}>Your activity and earning history will appear here.</Text>
    </WalletInfoBody>
    <WalletInfoFooter>
      <Button title='Start earning' block />
    </WalletInfoFooter>
  </WalletInfoWrapper>
}

// Wallet Component (Default)
export default function Wallet({ route, navigation }) {
  const [displayComponent, setDisplayComponent] = useState(true);
  return (
    <Canvas>
      <Container style={{ flex: 1 }}>
        <ZentTokenBanner tokens={0.01} usd={0} onPress={() => {
          navigation.navigate('ZentDonation')
        }}/>
        <Alert
          title='What is Zenbase Rewards?'
          body='Those who opt-in to Zenbase Rewards can interact with content and get paid ZENT tokens. You must spend at least 5 minutes listening to content to start earning ZENT tokens. If you do not want to receive ZENT tokens you may always choose to donate them.'
          style={{ marginTop: 5, marginBottom: 8 }}
        />
        {displayComponent ? <ReferFriend setDisplay={setDisplayComponent} /> : <History />}
      </Container>
    </Canvas>
  );
}
