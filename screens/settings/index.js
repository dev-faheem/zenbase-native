// Import Dependencies
import React from "react";
import { Alert, ScrollView, View, Image } from 'react-native';
import { Text, Container, Canvas, Button, IOSList, SongTile, Box } from "components";
import styled from "styled-components/native";
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from 'stores/theme';

// Import Images
import ZenbaseVector from 'assets/vectors/zenbase.png';
import AdVector from 'assets/vectors/Ad.png';
import SignoutVector from 'assets/vectors/sign-out.png';
import profileImage from 'assets/images/artist.png';

// Import Profile Header
import ProfileHeader from "screens/profile/header";

// Styled Component
const SongListWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`

export default function Settings({ route, navigation }) {
  const { theme } = useTheme();
  return (
    <View style={{flex: 1}}>
      <ProfileHeader editable profilePicture={profileImage} route={route} navigation={navigation} />
      <View style={{flex: 1, backgroundColor: theme.color.black}}>
        <ScrollView>
          <Container>
            <IOSList style={{ marginTop: 20, borderRadius: 10, paddingLeft: 10 }} data={[
              {
                icon: <Ionicons name="ios-add-circle" size={24} color={theme.color.primary} />,
                title: 'Post new sound',
                onPress: () => {
                  
                }
              },
              {
                icon: <FontAwesome5 name="user-plus" size={19} color={theme.color.primary} style={{ marginLeft: 2}} />,
                title: 'Invite Friends',
                onPress: () => {
                  
                }
              },
              {
                icon: <Image source={ZenbaseVector} style={{ marginRight: 3, width: 23, height: 23 }} resizeMode='center'  />,
                title: 'Zenbase Premium',
                onPress: () => {
                  
                }
              },
              {
                icon: <Image source={AdVector} style={{ marginRight: 3, width: 23, height: 23}} resizeMode='center' />,
                title: 'Zenbase Ads',
                onPress: () => {
                  
                }
              },
              {
                icon: <View style={{ marginRight: 3, width: 21, height: 21, borderRadius: 50, backgroundColor: theme.color.primary, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Ionicons name="arrow-forward" size={20} color={theme.color.hud} style={{ marginLeft: -4}} />
                </View>,
                title: 'Sign out',
                onPress: () => {
                  
                }
              }
            ]} />
          </Container>
        </ScrollView>
      </View>
    </View>
  );
}
