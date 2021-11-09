import React, { useState } from "react";
import { Alert, Container, Canvas, Text, Button } from 'components';
import styled from 'styled-components/native';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from "stores/theme";

// Import Images
import profileImage from 'assets/images/artist.png';

// Import Icons
import { Ionicons } from '@expo/vector-icons';

// Styled Component
const EditProfileHeader = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: ${props => props.theme.spacing.md}; 
`

const ProfileImageWrapper = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`

const ProfileImage = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 50px;
`

const EditButton = styled.TouchableOpacity`
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: ${props => props.theme.spacing.md};
  padding-right: ${props => props.theme.spacing.md};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.color.primary};
  border-radius: ${props => props.theme.borderRadius.lg};
`

// Edti Profile Component (Default)
export default function EditProfile({ route, navigation }) {
  const { theme } = useTheme();
  return (
    <Canvas>
      <EditProfileHeader>
          <TouchableOpacity onPress={() => { navigation.goBack(); }}>
            <Ionicons name="ios-chevron-back" size={30} color={theme.color.primary} />
          </TouchableOpacity>
          <Button variant="dull" title="Done" onPress={() => { }} />
      </EditProfileHeader>
      <Container style={{ flex: 1 }}>
        <ProfileImageWrapper>
          <ProfileImage source={profileImage}/>
          <EditButton onPress={() => {
            
          }}>
            <Text color='white' fontSize='md'>EDIT</Text>
        </EditButton>
        </ProfileImageWrapper>
      </Container>
    </Canvas>
  );
}
