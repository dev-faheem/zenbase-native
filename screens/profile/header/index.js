// Import Dependencies
import React from "react";
import { Dimensions, Platform, View } from 'react-native';
import { Text, Button } from "components";
import styled from "styled-components/native";
import { Ionicons } from '@expo/vector-icons';

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
  border-radius: 50px;
`

const ProfileHeaderButtons = styled.View`
  z-index: 1;
  position: absolute;
  top: ${() => Platform.OS == 'android' ? '25px': '60px'};
  justify-content: flex-end;
  flex-direction: row;
  width: 100%;
  height: auto;
`

const ProfileHeaderIconWrapper = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  border-radius: 50px;
  background-color: ${props => props.theme.color.secondary};
  justify-content: center;
  align-items: center;
`

const ProfileHeaderEditButton = styled.TouchableOpacity`
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: ${props => props.theme.spacing.md};
  padding-right: ${props => props.theme.spacing.md};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.xl};
  background-color: ${props => props.theme.color.primary};
  border-radius: ${props => props.theme.borderRadius.lg};
`

/**
 * **********
 * Components
 * **********
 */

// Profile Header
export default function ProfileHeader({ profilePicture, editable }) {

  const imageSource = typeof profilePicture == 'string' ? { uri: profilePicture} : profilePicture;

  return <ProfileHeaderWrapper source={imageSource} blurRadius={Platform.OS == 'android' ? 35 : 100} >
    <ProfileHeaderOverlay>
      <ProfileHeaderButtons>

        {editable ?
          <Button variant="silent" title="Done" style={{ right: 0, top: -2}} />
        : 
          <>
            <ProfileHeaderIconWrapper style={{ right: 30 }}>
              <Ionicons name="ios-add" size={24} color="white" style={{ marginLeft: 3 }} />
            </ProfileHeaderIconWrapper>

            <ProfileHeaderIconWrapper style={{ right: 20 }}>
              <Ionicons name="settings-sharp" size={16} color="white" />
            </ProfileHeaderIconWrapper>
          </>
        }

      </ProfileHeaderButtons>

      <ProfileHeaderSafeArea>
        <ProfileHeaderImage source={imageSource} resizeMode='cover' />
        <Text color='secondary' fontSize='30' fontWeight='bold' style={{ marginTop: 8 }}>Ella Lopez</Text>
        <Text color='secondary' fontSize='xl' style={{ marginTop: 8 }}>@EllaLopez</Text>
        <Text color='white' fontSize='lg' style={{ marginTop: 8 }}>https://zenbase.us/</Text>
        {editable && <ProfileHeaderEditButton >
            <Text color='white' fontSize='md'>EDIT</Text>
        </ProfileHeaderEditButton>}
      </ProfileHeaderSafeArea>

    </ProfileHeaderOverlay>
  </ProfileHeaderWrapper>
}
