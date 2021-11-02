// Import Dependencies
import React from "react";
import { ScrollView, View } from 'react-native';
import { Text, Container, Canvas, Button, IOSList, SongTile } from "components";
import styled from "styled-components/native";
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from 'stores/theme';

// Import Images
import profileImage from 'assets/images/artist.png';

// Import Profile Header
import ProfileHeader from "screens/profile/header";

export default function Profile({ route, navigation }) {
  const { theme } = useTheme();
  return (
    <View>
      <ProfileHeader profilePicture={profileImage} route={route} navigation={navigation} />
      <Canvas>
        <ScrollView style={{ flex: 1 }}>
          <Container style={{ flex: 1 }}>
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
            
            <Text fontWeight="bold" fontSize="h2" style={{ marginTop: 22 }}>Listening To</Text>
          </Container>
        </ScrollView>
      </Canvas>
    </View>
  );
}
