// Import Dependencies
import React from "react";
import { View, Platform } from 'react-native';
import { Text, Container, Canvas, Button } from "components";
import styled from "styled-components/native";
import { Ionicons } from '@expo/vector-icons';

// Import Images
import profileImage from 'assets/images/artist.png';

// Styled Component
/**
 * **************
 * Profile Header
 * **************
 */
const ProfileHeaderWrapper = styled.ImageBackground`
  background-color: ${props => props.theme.color.hud};
  width: 100%;
  height: 300px;
`

const ProfileHeaderOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.55);
`

const ProfileHeaderSafeArea = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const ProfileHeaderImage = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 50;
`

const ProfileHeaderButtons = styled.View`
  z-index: 1;
  position: absolute;
  top: 60px;
  justify-content: flex-end;
  flex-direction: row;
  width: 100%;
  height: auto;
`

const ProfileHeaderIconWrapper = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  border-radius: 50;
  background-color: ${props => props.theme.color.secondary};
  justify-content: center;
  align-items: center;
`

/**
 * **********
 * Components
 * **********
 */

// Profile Header
function ProfileHeader() {
  return <ProfileHeaderWrapper source={profileImage} blurRadius={Platform.OS == 'android' ? 35 : 100} >
    <ProfileHeaderOverlay>
      <ProfileHeaderButtons>

        {/* Icon Buttons */}
        <ProfileHeaderIconWrapper style={{ right: 30 }}>
          <Ionicons name="ios-add" size={24} color="white" style={{ marginLeft: 3}} />
        </ProfileHeaderIconWrapper>

        <ProfileHeaderIconWrapper style={{ right: 20 }}>
          <Ionicons name="settings-sharp" size={16} color="white" />
        </ProfileHeaderIconWrapper>

        {/* Text Button */}
        {/* <Button variant="silent" title="Done" style={{ right: 0, top: -2}} /> */}

      </ProfileHeaderButtons>

      <ProfileHeaderSafeArea>
        <ProfileHeaderImage source={profileImage} resizeMode='cover' />
        <Text color='secondary' fontSize='30' fontWeight='bold' style={{ marginTop: 8 }}>Ella Lopez</Text>
        <Text color='secondary' fontSize='xl' style={{ marginTop: 8 }}>@EllaLopez</Text>
        <Text color='white' fontSize='lg' style={{ marginTop: 8 }}>https://zenbase.us/</Text>
      </ProfileHeaderSafeArea>

    </ProfileHeaderOverlay>
  </ProfileHeaderWrapper>
}

export default function Profile() {
  return (
    <View>
      <ProfileHeader />
      <Canvas>

      </Canvas>
    </View>
  );
}
