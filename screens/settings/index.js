// Import Dependencies
import React, { useState } from "react";
import { Alert, ScrollView, View, Image, Switch } from 'react-native';
import { Text, Container, Canvas, Button, IOSList, SongTile, Box } from "components";
import styled from "styled-components/native";
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from 'stores/theme';

// Import Images
import ZenbaseVector from 'assets/vectors/zenbase.png';
import AdVector from 'assets/vectors/Ad.png';
import ZentTokenVector from 'assets/vectors/zen-token.png';
import profileImage from 'assets/images/artist.png';

// Import Profile Header
import ProfileHeader from "screens/profile/header";

// Styled Component
const SwitchWrapper = styled.View`
    height: 47px;
    width: 100%;
    border-radius: ${props => props.theme.borderRadius.xl};
    background-color: ${props => props.theme.color.hud};
    margin-top: ${props => props.theme.spacing.lg};
    padding-left: ${props => props.theme.spacing.md};
    padding-right: ${props => props.theme.spacing.md};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export default function Settings({ route, navigation }) {
  const { theme } = useTheme();

  // States
  const [autoRenew, setAutoRenew] = useState(false);

  const toggleAutoRenew = () => {
    setAutoRenew(!autoRenew);
  }

  return (
    <View style={{ flex: 1 }}>
      <ProfileHeader editable profilePicture={profileImage} route={route} navigation={navigation} />
      <View style={{ flex: 1, backgroundColor: theme.color.black }}>
        <ScrollView>
          <Container>
            <IOSList style={{ marginTop: 20, borderRadius: 10, paddingLeft: 10 }} data={[
              // {
              //   icon: <Ionicons name="ios-add-circle" size={24} color={theme.color.primary} />,
              //   title: 'Post new sound',
              //   onPress: () => {

              //   }
              // },
              {
                icon: <FontAwesome5 name="user-plus" size={19} color={theme.color.primary} style={{ marginLeft: 2 }} />,
                title: 'Invite Friends',
                onPress: () => {

                }
              },
              {
                icon: <Image source={ZenbaseVector} style={{ marginRight: 3, width: 23, height: 23 }} resizeMode='center' />,
                title: 'Zenbase Premium',
                onPress: () => {

                }
              },
              {
                icon: <Image source={AdVector} style={{ marginRight: 3, width: 23, height: 23 }} resizeMode='center' />,
                title: 'Zenbase Ads',
                onPress: () => {

                }
              },
              {
                icon: <Image source={ZentTokenVector} style={{ marginRight: 3, width: 21, height: 21 }} resizeMode='cover' />,
                title: 'Zenbase Rewards',
                onPress: () => {

                }
              },
              {
                icon: <View style={{ marginRight: 3, width: 21, height: 21, borderRadius: 50, backgroundColor: theme.color.primary, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                  <Ionicons name="arrow-forward" size={20} color={theme.color.hud} style={{ marginLeft: -4 }} />
                </View>,
                title: 'Sign out',
                onPress: () => {

                }
              }
            ]} />
            <SwitchWrapper>
              <Text numberOfLines={1}>Renew Zenbase Premium Automatically</Text>
              <Switch onValueChange={toggleAutoRenew} value={autoRenew} />
            </SwitchWrapper>
            <Text fontSize='sm' color='information' style={{ marginTop: 8, paddingLeft: 8 }}>When you have enough Zentoken your tokens will be redeemed for Zenbase Premium automatically.</Text>
          </Container>
        </ScrollView>
      </View>
    </View>
  );
}
