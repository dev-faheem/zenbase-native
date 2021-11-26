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

const WalletHistoryListText = styled.View`
  flex:1;
`;

const WalletHistoryListThumbnail = styled.Image`
  width: 78px;
  height: 78px;
  border-radius: ${props => props.theme.borderRadius.lg};
`

const WalletHistoryListEmpty = styled.View`
  width: 100%;
  background-color: ${props => props.theme.color.hud}B3;
  border-radius: ${props => props.theme.borderRadius.lg};
  position: absolute;
  z-index: -1;
  left: ${(props) => props.theme.spacing.xxl};
` 

/**
 * **********
 * Components
 * **********
 */
// ReferFriend Component
function ReferFriend() {
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
      <Button title='Skip' variant='secondary' block onPress={() => { }} />
    </WalletInfoFooter>
  </WalletInfoWrapper>
}

// History Component
function History({ ZentBanner }) {
  return <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
    {ZentBanner}
    <Text fontSize="18" fontWeight='600' style={{ marginTop: 10, marginBottom: 10, marginLeft: 5 }}>Your Activity</Text>
    
    {/* Wallet History List */}
    <WalletHistoryList>
      <WalletHistoryListText>
        <Text fontSize='lg' numberOfLines={1}>5 minutes • 0.01 ZENT</Text>
        <Text fontSize='md' numberOfLines={1} style={{ marginTop: 2 }} color='primary'>Our Purpose Has Presence</Text>
        <Text fontSize='md' numberOfLines={1}style={{ marginTop: 10 }} color='secondary'>Damon</Text>
      </WalletHistoryListText>
      <WalletHistoryListThumbnail source={wallpaper1} resizeMode='cover' />
    </WalletHistoryList>

    <WalletHistoryList>
      <WalletHistoryListText>
        <Text fontSize='lg' numberOfLines={1}>10 minutes • 0.02 ZENT</Text>
        <Text fontSize='md' numberOfLines={1} style={{ marginTop: 2 }} color='primary'>Move Mountain</Text>
        <Text fontSize='md' numberOfLines={1} style={{ marginTop: 10 }} color='secondary'>Super Seeker</Text>
      </WalletHistoryListText>
      <WalletHistoryListThumbnail source={wallpaper2} resizeMode='cover' />
    </WalletHistoryList>

    <WalletHistoryList>
      <WalletHistoryListText>
        <Text fontSize='lg' numberOfLines={1}>5 minutes • 0.01 ZENT</Text>
        <Text fontSize='md' numberOfLines={1} style={{ marginTop: 2 }} color='primary'>Let Go</Text>
        <Text fontSize='md' numberOfLines={1} style={{ marginTop: 10 }} color='secondary'>Freestyle</Text>
      </WalletHistoryListText>
      <WalletHistoryListThumbnail source={wallpaper3} resizeMode='cover' />
    </WalletHistoryList>

    <WalletHistoryList>
      <WalletHistoryListText>
        <Text fontSize='lg' numberOfLines={1}>15 minutes • 0.03 ZENT</Text>
        <Text fontSize='md' numberOfLines={1} style={{ marginTop: 2 }} color='primary'>Wisdom of The Ancients</Text>
        <Text fontSize='md' numberOfLines={1} style={{ marginTop: 10 }} color='secondary'>Master Chadd</Text>
      </WalletHistoryListText>
      <WalletHistoryListThumbnail source={wallpaper4} resizeMode='cover' />
    </WalletHistoryList>

    {/* Wallet History List - End*/}
  </ScrollView>
}

// No History Found
function NoHistoryFound({ ZentBanner }) {

  const generateEmptyList = (height, n) => {
    let initTop = 255;
    let paddintTop = 0;

    let result = []
    for (let i = 1; i <= n; i++) {
      result.push(<WalletHistoryListEmpty style={{ top: (initTop + paddintTop), height: height }}/>)
      paddintTop += height + 15;
    }

    return result;
  }

  return <>
    {ZentBanner}
    {generateEmptyList(88, 10)}
    <WalletInfoWrapper>
      <WalletInfoBody>
        <MaterialCommunityIcons name="clock-time-nine" size={40} color='white' style={{ marginBottom: 6 }} />
        <Text fontSize='h2'>History</Text>
        <Text fontSize='md' style={{ marginTop: 5 }}>Your activity and earning history will appear here.</Text>
      </WalletInfoBody>
    </WalletInfoWrapper>
  </>
}

// Wallet Component (Default)
export default function Wallet({ route, navigation }) {

  const ZentToken = <ZentTokenBanner tokens={0.01} usd={0} onPress={() => {
    navigation.navigate('ZentDonation')
  }} />;

  return (
    <Canvas>
      <Container style={{ flex: 1 }}>
       <History ZentBanner={ZentToken}/>
       {/* <NoHistoryFound ZentBanner={ZentToken}/> */}
      </Container>
    </Canvas>
  );
}
