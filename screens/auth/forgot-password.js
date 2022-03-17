import React, { useState, useEffect } from "react";
import { Text, Container, Canvas, Button } from "components";
import styled from 'styled-components/native';
import { useTheme } from "stores/theme";
import { Ionicons } from '@expo/vector-icons';
import axios from 'services/axios';


// Styled Component
const InputWrapper = styled.View`
  width: 100%;
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

export default function ForgotPassword({ navigation }) {
  const { theme } = useTheme();

  // States
  const [isNextEnabled, setIsLoginEnabled] = useState(false);
  const [phoneNumberOrEmail, setPhoneNumberOrEmail] = useState('');

  // Input Handler
  const updateInput = (setState, value) => {
    setState(value);
  }

  const forgotPassword = async () => {
    try {
      let type = 'phoneNumber'; // or email
      if (/[a-zA-Z]/g.test(phoneNumberOrEmail)) {
        type = 'email'
      }
  
      const value = phoneNumberOrEmail;
      
      const { data } =  await axios.post('/auth/generate-otp', {
        username: phoneNumberOrEmail,
      });
  
      navigation.navigate('OTP', { type, value, userId: data.data.userId });
    } catch(e) {
      axios.handleError(e);
    }

  }


  useEffect(() => {
    if (phoneNumberOrEmail.trim() == '') {
      setIsLoginEnabled(false);
    } else {
      setIsLoginEnabled(true);
    }
  }, [phoneNumberOrEmail])



  return (
    <Canvas>
      <Container style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        
        <Ionicons name='lock-closed' size={36} color='white' />
        <Text fontSize='h2' fontWeight='bold' style={{ marginTop: 8 }}>Trouble logging in?</Text>
        <Text style={{ textAlign: 'center', marginTop: 8, marginBottom: 10}}>Enter your email or phone number and we’ll send you a link to get your account back.</Text>
        <InputWrapper>
          <Input
            autoCapitalize='none'
            placeholder='Phone number or email'
            placeholderTextColor={theme.color.secondary}
            onChangeText={(value) => updateInput(setPhoneNumberOrEmail, value)}
            value={phoneNumberOrEmail}
          />
        </InputWrapper>
      </Container>
      <FooterWrapper>
        <Container style={{ flex: 1 }}>
          <FooterFlex>
            <Button onPress={() => navigation.goBack()} variant='silent' fontSize='14' title='Go back log in' style={{ marginTop: 8, marginBottom: 2 }} />
            <Button variant={isNextEnabled ? 'primary' : 'disabled'} title='Next' block onPress={() => {
              if (isNextEnabled) {
                  forgotPassword();
              }
             }} />
          </FooterFlex>
        </Container>
      </FooterWrapper>
    </Canvas>
  );
}
