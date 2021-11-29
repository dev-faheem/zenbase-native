// Import Dependencies
import React from "react";
import { Alert, ScrollView, View } from 'react-native';
import { Text, Container, Canvas, Button, IOSList, SongTile, Box, NavigationPadding } from "components";
import styled from "styled-components/native";
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from 'stores/theme';

// Import Images
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

export default function Profile({ route, navigation }) {
  const { theme } = useTheme();
  return (
    <View style={{flex: 1}}>
      <ProfileHeader profilePicture={profileImage} route={route} navigation={navigation} />
      <View style={{flex: 1, backgroundColor: theme.color.black}}>
        <ScrollView>
          <Container>
            <IOSList style={{ marginTop: 12, borderRadius: 10 }} notDefault transparent data={[
              {
                icon: <Ionicons name="ios-musical-note" size={24} color={theme.color.primary} />,
                title: 'Sounds',
                onPress: () => {
                  navigation.navigate('Sounds');
                }
              },
              {
                icon: <FontAwesome5 name="users" size={20} color={theme.color.primary} />,
                title: 'Followers',
                onPress: () => {
                  navigation.navigate('Followers', {
                    title: 'Followers'
                  });
                }
              },
              {
                icon: <FontAwesome5 name="user-alt" size={19} color={theme.color.primary} style={{ marginLeft: 2, marginRight: 3 }} />,
                title: 'Following',
                onPress: () => {
                  navigation.navigate('Followers', {
                    title: 'Following'
                  });
                }
              },
              {
                icon: <Ionicons name="ios-journal" size={24} color={theme.color.primary} />,
                title: 'My Journal',
                onPress: () => {
                  navigation.navigate('Journal');
                }
              }
            ]} />
            
            <Text fontSize="20" style={{ marginTop: 22, marginBottom: 22 }}>Listening To</Text>

            <SongListWrapper> 
              <SongTile style={{marginBottom: 20}} inGrid mock/>
              <SongTile style={{marginBottom: 20}} inGrid mock/>
              <SongTile style={{marginBottom: 20}} inGrid mock/>
              <SongTile style={{marginBottom: 20}} inGrid mock/>
            </SongListWrapper>
          </Container>

          <NavigationPadding withSafeAreaInsets /> 
        </ScrollView>
      </View>
    </View>
  );
}
