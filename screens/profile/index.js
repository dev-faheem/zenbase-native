// Import Dependencies
import React from "react";
import { View, SafeAreaView } from 'react-native';
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
  width: 100%;
  height: 270px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

/**
 * **********
 * Components
 * **********
 */

// Profile Header
function ProfileHeader() {
  return <ProfileHeaderWrapper source={profileImage} blurRadius={100}>

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
