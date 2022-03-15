// Import Dependencies
import React from 'react';
import { Dimensions, Platform, View } from 'react-native';
import { Text, Button } from 'components';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

// Import Images
import ZenbaseWhiteVector from 'assets/vectors/zenbase-white.png';
import { useAuth } from 'stores/auth';

// Styled Component
/**
 * **************
 * Profile Header
 * **************
 */
const ProfileHeaderWrapper = styled.ImageBackground`
  background-color: ${(props) => props.theme.color.hud};
  width: 100%;
  height: ${(Platform.OS == 'ios' ? Constants.statusBarHeight : 5) + 270}px;
`;

const ProfileHeaderOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.55);
`;

const ProfileHeaderSafeArea = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ProfileHeaderImage = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 50px;
`;

const ProfileHeaderButtons = styled.View`
  z-index: 1;
  position: absolute;
  top: ${() =>
    Platform.OS == 'android' ? '15px' : Constants.statusBarHeight + 5 + 'px'};
  /* top: ${() => (Platform.OS == 'android' ? '25px' : '55px')}; */
  justify-content: flex-end;
  flex-direction: row;
  width: 100%;
  height: auto;
`;

const ProfileHeaderIconWrapper = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  border-radius: 50px;
  background-color: ${(props) => props.theme.color.secondary};
  justify-content: center;
  align-items: center;
`;

const ProfileHeaderEditButton = styled.TouchableOpacity`
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: ${(props) => props.theme.spacing.md};
  padding-right: ${(props) => props.theme.spacing.md};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${(props) => props.theme.spacing.lg};
  background-color: ${(props) => props.theme.color.primary};
  border-radius: ${(props) => props.theme.borderRadius.lg};
`;

const PlayTime = styled.View`
  margin-top: ${(props) => props.theme.spacing.md};
  flex-direction: row;
`;

const ZenbaseWhiteImage = styled.Image`
  width: 17px;
  height: 17px;
  margin-right: 5px;
`;

/**
 * **********
 * Components
 * **********
 */

// Profile Header
export default function ProfileHeader({
  profilePicture,
  editable,
  route,
  navigation,
}) {
  let imageSource =
    typeof profilePicture == 'string'
      ? { uri: profilePicture }
      : profilePicture;

  const { user } = useAuth();

  if (user.image) {
    imageSource = { uri: user.image };
  }

  console.log({ user });

  return (
    <ProfileHeaderWrapper
      source={imageSource}
      blurRadius={Platform.OS == 'android' ? 35 : 100}
    >
      <ProfileHeaderOverlay>
        <ProfileHeaderButtons>
          {editable ? (
            <Button
              variant="silent"
              title="Done"
              style={{ right: 0, top: -5 }}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ) : (
            <>
              {/* <ProfileHeaderIconWrapper style={{ right: 28 }}>
              <Ionicons name="ios-add" size={24} color="white" style={{ marginLeft: 3 }} />
            </ProfileHeaderIconWrapper> */}

              <ProfileHeaderIconWrapper
                style={{ right: 20 }}
                onPress={() => {
                  navigation.navigate('Settings');
                }}
              >
                <Ionicons
                  name="settings-sharp"
                  style={{ marginLeft: 1 }}
                  size={16}
                  color="white"
                />
              </ProfileHeaderIconWrapper>
            </>
          )}
        </ProfileHeaderButtons>

        <ProfileHeaderSafeArea>
          <ProfileHeaderImage source={imageSource} resizeMode="cover" />
          <Text
            color="secondary"
            fontSize="30"
            fontWeight="bold"
            style={{ marginTop: 8 }}
          >
            {user?.name}
          </Text>
          <Text color="secondary" fontSize="xl" style={{ marginTop: 8 }}>
            @{user?.username}
          </Text>
          <PlayTime>
            <ZenbaseWhiteImage source={ZenbaseWhiteVector} />
            <Text color="white" fontSize="lg">
              {user?.hours || 0} Hour{user?.hours != 1 && 's'}
            </Text>
          </PlayTime>
          {editable && (
            <ProfileHeaderEditButton
              onPress={() => {
                // navigation.goBack();
                navigation.navigate('EditProfile', {profilePicture: imageSource});
              }}
            >
              <Text color="white" fontSize="md">
                EDIT
              </Text>
            </ProfileHeaderEditButton>
          )}
        </ProfileHeaderSafeArea>
      </ProfileHeaderOverlay>
    </ProfileHeaderWrapper>
  );
}
