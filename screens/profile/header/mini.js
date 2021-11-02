// Import Dependencies
import React from "react";
import { Platform, TouchableOpacity } from 'react-native';
import { Text, Button } from "components";
import styled from "styled-components/native";
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from "stores/theme";

// Styled Component
/**
 * **************
 * Profile Header
 * **************
 */
const ProfileHeaderWrapper = styled.ImageBackground`
  background-color: ${props => props.theme.color.hud};
  width: 100%;
  height: 130px;
`

const ProfileHeaderOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.55);
`

const ProfileHeaderSafeArea = styled.SafeAreaView`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ProfileHeaderImageWrapper = styled.View`
  flex-direction: column;
  align-items: center;
`

const ProfileHeaderImage = styled.Image`
  height: 40px;
  width: 40px;
  border-radius: 50;
`

const ProfileHeaderButtons = styled.View`
  z-index: 1;
  position: absolute;
  top: ${() => Platform.OS == 'android' ? '25px' : '60px'};
  justify-content: space-between;
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
export default function MiniProfileHeader({ 
    profilePicture, 
    route, 
    navigation, 
    secondaryButton, 
    secondaryButtonOnPress,   
    backButton = true, 
}) {

    const { theme } = useTheme();

    const imageSource = typeof profilePicture == 'string' ? { uri: profilePicture } : profilePicture;

    return <ProfileHeaderWrapper source={imageSource} blurRadius={Platform.OS == 'android' ? 35 : 100} >
        <ProfileHeaderOverlay>
            <ProfileHeaderButtons>

                {/* Back Buttons */}
                <TouchableOpacity onPress={() => {
                    navigation.goBack();
                }}>
                    {backButton && <Ionicons name="ios-chevron-back" size={32} color={theme.color.primary} style={{ marginLeft: 10, top: -3 }} />}
                </TouchableOpacity>

                {/* Text Button */}
                {secondaryButton && <Button variant="silent" title={secondaryButton} style={{ top: -2 }} onPress={secondaryButtonOnPress || null} />}

            </ProfileHeaderButtons>

            <ProfileHeaderSafeArea>
                <ProfileHeaderImageWrapper>
                    <ProfileHeaderImage source={imageSource} resizeMode='cover' />
                    <Text style={{ marginTop: 4 }}>Ella Loppez</Text>
                </ProfileHeaderImageWrapper>
            </ProfileHeaderSafeArea>

        </ProfileHeaderOverlay>
    </ProfileHeaderWrapper>
}
