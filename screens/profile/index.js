// Import Dependencies
import React from "react";
import { View } from 'react-native';
import { Text, Container, Canvas } from "components";
import styled from "styled-components/native";

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

/**
 * **********
 * Components
 * **********
 */

// Profile Header
function ProfileHeader() {
  return <ProfileHeaderWrapper source={profileImage} blurRadius={100}>
    <ProfileHeaderOverlay>
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
