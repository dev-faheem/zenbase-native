import React, { useState, useEffect, useRef } from "react";
import { Text, Container, Canvas, Button, Box } from "components";
import { useNavigation } from "@react-navigation/core";
import { StackActions, CommonActions } from "@react-navigation/native";
import styled from 'styled-components/native';
import { useAuth } from "stores/auth";

// Import Images
import ZentbaseLogoPrimary from 'assets/images/zenbase-full-primary-logo.png';
import { useTheme } from "stores/theme";
import { TouchableOpacity } from "react-native";

// Styled Component
const ZenbaseLogo = styled.Image`
  width: 176px;
  height: 48px;
  margin-top: ${props => props.theme.spacing.md};
`
const InputWrapper = styled.View`
  width: 100%;
  margin-top: 40px;
`

const Input = styled.TextInput`
  width: 100%;
  height: 40px;
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.theme.color.hud};
  color: ${props => props.theme.color.white};
  margin-top: ${props => props.theme.spacing.md};
`


const FooterWrapper = styled.View`
  width: 100%;
  height: 190px;
`

const FooterFlex = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const TermsAndPrivacyWrapper = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: ${props => props.theme.spacing.lg};
`

const TermsAndPrivacyFlex = styled.View`
  flex-direction: row;
  justify-content: flex-start;
`

export default function register({ navigation }) {
  const { theme } = useTheme();

  const passwordInput = useRef();

  // States
  const [isRegisterEnabled, setIsLoginEnabled] = useState(false);
  const [phoneNumberOrEmail, setPhoneNumberOrEmail] = useState('');
  const [password, setPassword] = useState('')

  // Input Handler
  const updateInput = (setState, value) => {
    setState(value);
  }

  // Login Handler
  const registerHandler = () => {
    
  }

  useEffect(() => {
    if (phoneNumberOrEmail.trim() == '' || password == '') {
      setIsLoginEnabled(false);
    } else {
      setIsLoginEnabled(true);
    }
  }, [phoneNumberOrEmail, password])



  return (
    <Canvas>
      <Container style={{ flex: 1 }}>
        <Text fontSize='34' fontWeight='bold' style={{ marginTop: 10 }}>Meditate, Earn, Repeat</Text>
        <ZenbaseLogo source={ZentbaseLogoPrimary} />

        <InputWrapper>
          <Input
            autoCapitalize='none'
            placeholder='Phone number or email'
            placeholderTextColor={theme.color.secondary}
            onChangeText={(value) => updateInput(setPhoneNumberOrEmail, value)}
            value={phoneNumberOrEmail}
            onSubmitEditing={() => passwordInput.current.focus()}
          />

          <Input
            placeholder='Password'
            placeholderTextColor={theme.color.secondary}
            onChangeText={(value) => updateInput(setPassword, value)}
            secureTextEntry={true}
            value={password}
            ref={passwordInput}
          />

          <Button onPress={() => navigation.goBack()} variant='silent' fontSize='14' title='Already have an account' style={{ marginTop: 8 }} />
        </InputWrapper>
      </Container>
      <FooterWrapper>
        <Container style={{ flex: 1 }}>
          <FooterFlex>
            <Box h={60} />
            <Button variant={isRegisterEnabled ? 'primary' : 'disabled'} title='Continue' block onPress={() => {
              if (isRegisterEnabled) {
                registerHandler();
              }
            }} />
            <TermsAndPrivacyWrapper>
              <TermsAndPrivacyFlex>
                <Text>By signing in you accept our </Text>
                <TouchableOpacity>
                  <Text fontWeight='bold' style={{ textDecorationLine: "underline" }}>Terms of use</Text>
                </TouchableOpacity>
              </TermsAndPrivacyFlex>

              <TermsAndPrivacyFlex style={{ marginTop: 2 }}>
                <Text>and </Text>
                <TouchableOpacity>
                  <Text fontWeight='bold' style={{ textDecorationLine: "underline" }}>Privacy Policy</Text>
                </TouchableOpacity>
              </TermsAndPrivacyFlex>
            </TermsAndPrivacyWrapper>
          </FooterFlex>
        </Container>
      </FooterWrapper>
    </Canvas>
  );
}
