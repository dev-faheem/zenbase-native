// Import Dependencies
import React from "react";
import { View } from 'react-native';
import { Text, Container, Canvas, Button } from "components";
import styled from "styled-components/native";

// Import Images
import profileImage from 'assets/images/artist.png';

// Import Profile Header
import ProfileHeader from "screens/profile/header";

export default function Profile() {
  return (
    <View>
      <ProfileHeader profilePicture={profileImage}/>
      <Canvas>

      </Canvas>
    </View>
  );
}
