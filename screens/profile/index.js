// Import Dependencies
import React from "react";
import { Alert, ScrollView, View } from 'react-native';
import { Text, Container, Canvas, Button, IOSList, SongTile, Box } from "components";
import styled from "styled-components/native";
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from 'stores/theme';

// Import Images
import profileImage from 'assets/images/artist.png';

// Import Profile Header
import ProfileHeader from "screens/profile/header";

// Styled Component
const SongListWrapper = styled.View`
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
            <IOSList style={{ marginTop: 12, borderRadius: 10 }} transparent data={[
              {
                icon: <Ionicons name="ios-musical-note" size={24} color={theme.color.primary} />,
                title: 'Sounds',
                onPress: () => {

                }
              },
              {
                icon: <FontAwesome5 name="users" size={20} color={theme.color.primary} />,
                title: 'Followers',
                onPress: () => {
                  navigation.navigate('Followers', {
                    title: 'Followers'
                  })
                }
              },
              {
                icon: <FontAwesome5 name="user-alt" size={20} color={theme.color.primary} style={{ marginRight: 3 }} />,
                title: 'Following',
                onPress: () => {
                  navigation.navigate('Followers', {
                    title: 'Following'
                  })
                }
              }
            ]} />
            
            <Text fontSize="20" style={{ marginTop: 22, marginBottom: 22 }}>Listening To</Text>

            <SongListWrapper> 
              <SongTile style={{marginBottom: 20}} mock/>
              <SongTile style={{marginBottom: 20}} mock/>
              <SongTile style={{marginBottom: 20}} mock/>
              <SongTile style={{marginBottom: 20}} mock/>
            </SongListWrapper>
          </Container>
        </ScrollView>
      </View>
    </View>
  );
}
