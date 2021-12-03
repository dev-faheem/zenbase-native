import React, { useState, useRef, useEffect } from "react";
import { Text, Container, Canvas, Button } from "components";
import styled from 'styled-components/native';
import { useTheme } from "stores/theme";
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAvoidingView } from 'react-native'


// Styled Component
const InputWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Input = styled.TextInput`
  width: 25px;
  font-size: 24px;
  padding-top: ${props => props.theme.spacing.sm};
  padding-bottom: ${props => props.theme.spacing.sm};
  text-align: center;
  border-bottom-width: 2px;
  border-bottom-color: ${props => props.theme.color.white};
  color: ${props => props.theme.color.white};
  margin-left: ${props => props.theme.spacing.sm};
  margin-right: ${props => props.theme.spacing.sm};
`


const FooterWrapper = styled.View`
  width: 100%;
  height: 120px;
`

const FooterFlex = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

export default function OneTimePassword({ route, navigation }) {
  const { theme } = useTheme();

  // Params
  const { type, value } = route.params;


  // Refs
  const inputRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef()
  ];

  // States
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  useEffect(() => {
    if (otp.join('').length == 6) {
      setIsNextEnabled(true);
    } else {
      setIsNextEnabled(false);
    }
  }, otp)



  return (
    <Canvas>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' >
        <Container style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name={type == 'phoneNumber' ? 'call' : 'mail'} size={36} color='white' />
          <Text fontSize='h2' fontWeight='bold' style={{ marginTop: 8 }}>Enter Confirmation Code</Text>
          <Text style={{ textAlign: 'center', marginTop: 8 }}>Enter the 6-digit secret code we sent to</Text>
          <Text style={{ textAlign: 'center', marginTop: 2, marginBottom: 10 }}>{value}</Text>
          <InputWrapper>
            <Input
              selectionColor={theme.color.white}
              keyboardType={'numeric'}
              maxLength={1}
              ref={inputRefs[0]}
              onChangeText={(value) => {
                if (value !== '') {
                  inputRefs[1].current.focus();
                }

                const updatedOtp = [...otp];
                updatedOtp[0] = `${value}`;
                setOtp(updatedOtp);
              }}
              onKeyPress={e => {
                if (e.nativeEvent.key != 'Backspace' && e.nativeEvent.value != '') {
                    inputRefs[1].current.focus();
                }
              }}
              value={otp[0]}
              blurOnSubmit={false}
            />
            <Input
              selectionColor={theme.color.white}
              keyboardType={'numeric'}
              maxLength={1}
              ref={inputRefs[1]}
              onChangeText={(value) => {
                if (value !== '') {
                  inputRefs[2].current.focus();
                }

                const updatedOtp = [...otp];
                updatedOtp[1] = `${value}`;
                setOtp(updatedOtp);
              }}
              onKeyPress={e => {
                if ((e.nativeEvent.key == 'Backspace' && e.nativeEvent.value === undefined) || (e.nativeEvent.key == 'Backspace' && e.nativeEvent.value === '')) {
                  inputRefs[0].current.focus();
                } else if (e.nativeEvent.value !== '') {
                  inputRefs[2].current.focus();
                }
              }}
              value={otp[1]}
              blurOnSubmit={false}
            />
            <Input
              selectionColor={theme.color.white}
              keyboardType={'numeric'}
              maxLength={1}
              ref={inputRefs[2]}
              onChangeText={(value) => {
                if (value !== '') {
                  inputRefs[3].current.focus();
                }

                const updatedOtp = [...otp];
                updatedOtp[2] = `${value}`;
                setOtp(updatedOtp);
              }}
              onKeyPress={e => {
                if ((e.nativeEvent.key == 'Backspace' && e.nativeEvent.value === undefined) || (e.nativeEvent.key == 'Backspace' && e.nativeEvent.value === '')) {
                  inputRefs[1].current.focus();
                } else if (e.nativeEvent.value !== '') {
                  inputRefs[3].current.focus();
                }
              }}
              value={otp[2]}
              style={{ marginRight: 20 }}
              blurOnSubmit={false}
            />
            <Input
              selectionColor={theme.color.white}
              keyboardType={'numeric'}
              maxLength={1}
              ref={inputRefs[3]}
              onChangeText={(value) => {
                if (value !== '') {
                  inputRefs[4].current.focus();
                }

                const updatedOtp = [...otp];
                updatedOtp[3] = `${value}`;
                setOtp(updatedOtp);
              }}
              onKeyPress={e => {
                if ((e.nativeEvent.key == 'Backspace' && e.nativeEvent.value === undefined) || (e.nativeEvent.key == 'Backspace' && e.nativeEvent.value === '')) {
                  inputRefs[2].current.focus();
                } else if (e.nativeEvent.value !== '') {
                  inputRefs[4].current.focus();
                }
              }}
              value={otp[3]}
              style={{ marginLeft: 20 }}
              blurOnSubmit={false}
            />
            <Input
              selectionColor={theme.color.white}
              keyboardType={'numeric'}
              maxLength={1}
              ref={inputRefs[4]}
              onChangeText={(value) => {
                if (value !== '') {
                  inputRefs[5].current.focus();
                }

                const updatedOtp = [...otp];
                updatedOtp[4] = `${value}`;
                setOtp(updatedOtp);
              }}
              onKeyPress={e => {
                if ((e.nativeEvent.key == 'Backspace' && e.nativeEvent.value === undefined) || (e.nativeEvent.key == 'Backspace' && e.nativeEvent.value === '')) {
                  inputRefs[3].current.focus();
                } else if (e.nativeEvent.value !== '') {
                  inputRefs[5].current.focus();
                }
              }}
              value={otp[4]}
              blurOnSubmit={false}
            />
            <Input
              selectionColor={theme.color.white}
              keyboardType={'numeric'}
              maxLength={1}
              ref={inputRefs[5]}
              onChangeText={(value) => {
                const updatedOtp = [...otp];
                updatedOtp[5] = `${value}`;
                setOtp(updatedOtp);
              }}
              onKeyPress={e => {
                if ((e.nativeEvent.key == 'Backspace' && e.nativeEvent.value === undefined) || (e.nativeEvent.key == 'Backspace' && e.nativeEvent.value === '')) {
                  inputRefs[4].current.focus();
                }
              }}
              value={otp[5]}
              blurOnSubmit={false}
            />
          </InputWrapper>
        </Container>

        <FooterWrapper>
          <Container style={{ flex: 1 }}>
            <FooterFlex>
              <Button onPress={() => {
                navigation.goBack();
                navigation.goBack();
              }} variant='silent' fontSize='14' title='Go back log in' style={{ marginTop: 8, marginBottom: 2 }} />
              <Button variant={isNextEnabled ? 'primary' : 'disabled'} title='Next' block onPress={() => { }} />
            </FooterFlex>
          </Container>
        </FooterWrapper>
      </KeyboardAvoidingView>
    </Canvas>
  );
}
