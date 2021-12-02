import React, { useState } from "react";
import { Alert, Container, Canvas, Text, Button } from 'components';
import styled from 'styled-components/native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from "stores/theme";
import * as ImagePicker from 'expo-image-picker';

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

const InputWrapper = styled.View`
  width: 100%;
  background-color: ${props => props.theme.color.hud};
  border-radius: ${props => props.theme.borderRadius.lg};
  margin-top: ${props => props.theme.spacing.md};
`

const InputGroup = styled.View`
  padding-left: ${props => props.theme.spacing.lg};
  height: 45px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

const InputLabel = styled.View`
  flex: 1;
`

const Input = styled.TextInput`
  max-width: 50%;
  color: ${props => props.theme.color.white};
  height: 45px;
  margin-right: ${props => props.theme.spacing.md};
  text-align: right;
`

const HR = styled.View`
  margin-left: ${props => props.theme.spacing.lg};
  border-bottom-width: 0.5px;
  border-bottom-color: ${props => props.theme.color.informationBackground};
`

// Edti Profile Component (Default)
export default function EditProfile({ route, navigation }) {
  // Theme Configuration
  const { theme } = useTheme();

  // Profile Image 
  const [image, setImage] = useState(null);

  // States
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const [fullname, setFullname] = useState('Ella Lopez');
  const [username, setUsername] = useState('ellalopez')

  // Input Handler
  const updateInput = (setState, value) => {
    setState(value);

    if (!isProfileUpdated) {
      setIsProfileUpdated(true);
    }
  }

  const editProfile = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);

        // Form Data to Save Photo
        let body = new FormData();
        body.append('profilePicture', { uri: result.uri, name: 'image.jpg', type: 'image/jpeg' });

        if (!isProfileUpdated) {
          setIsProfileUpdated(true);
        }
      }
    } catch (err) {
      // Error Handling
    }

  }

  // Save Changes
  const saveChanges = () => {
    if (isProfileUpdated) {
      // Logic to save profile changes

      // Close Edit Profile Model after updating profile
      navigation.goBack();
    }
  }

  return (
    <Canvas>
      <EditProfileHeader>
        <TouchableOpacity onPress={() => { navigation.goBack(); }}>
          <Ionicons name="ios-chevron-back" size={30} color={theme.color.primary} />
        </TouchableOpacity>
        <Button variant={isProfileUpdated ? 'silent' : 'silentDisabled'} title="Done" onPress={saveChanges} />
      </EditProfileHeader>
      <Container style={{ flex: 1 }}>
        <ProfileImageWrapper>
          <ProfileImage source={image ? { uri: image } : profileImage} resizeMode='cover' />
          <EditButton onPress={editProfile}>
            <Text color='white' fontSize='md'>EDIT</Text>
          </EditButton>
        </ProfileImageWrapper>

        <InputWrapper>

          {/* Full Name */}
          <InputGroup>
            <InputLabel>
              <Text>Name</Text>
            </InputLabel>
            <Input
              placeholder='Full Name'
              placeholderTextColor={theme.color.secondary}
              onChangeText={(value) => updateInput(setFullname, value)}
              value={fullname}
            />
          </InputGroup>
          {/* Full Name - End*/}

          <HR />

          {/* Username */}
          <InputGroup>
            <InputLabel>
              <Text>Username</Text>
            </InputLabel>
            <Text color='secondary'>@</Text>
            <Input
              placeholder='username'
              placeholderTextColor={theme.color.secondary}
              onChangeText={(value) => updateInput(setUsername, value)}
              value={username}
            />
          </InputGroup>
          {/* Username - End*/}

        </InputWrapper>
        <Text color='information' style={{ padding: 5, paddingTop: 10 }} fontSize='sm'>Your photo, name, and username will be visible in Zenbase and web search results.</Text>
      </Container>
    </Canvas>
  );
}
