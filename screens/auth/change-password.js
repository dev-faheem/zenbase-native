import React, { useState, useEffect, useRef } from "react";
import { Text, Container, Canvas, Button } from "components";
import { StackActions, CommonActions } from "@react-navigation/native";
import styled from "styled-components/native";
import { useAuth } from "stores/auth";
import { useTheme } from "stores/theme";
import { ScrollView, TouchableOpacity } from "react-native";
import axios from "services/axios";
import SplashScreen from "screens/splash-screen";

// Import Images
import ZentbaseLogoPrimary from "assets/images/zenbase-full-primary-logo.png";
import { useLoader } from "stores/loader";

// Styled Component
const ZenbaseLogo = styled.Image`
  width: 176px;
  height: 48px;
  margin-top: ${(props) => props.theme.spacing.md};
`;
const InputWrapper = styled.View`
  width: 100%;
  margin-top: 40px;
`;

const Input = styled.TextInput`
  width: 100%;
  height: 40px;
  padding: ${(props) => props.theme.spacing.sm};
  border-radius: ${(props) => props.theme.borderRadius.md};
  background-color: ${(props) => props.theme.color.hud};
  color: ${(props) => props.theme.color.white};
  margin-top: ${(props) => props.theme.spacing.sm};
`;

const FooterWrapper = styled.View`
  width: 100%;
  height: 190px;
`;

const FooterFlex = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const TermsAndPrivacyWrapper = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: ${(props) => props.theme.spacing.lg};
`;

const TermsAndPrivacyFlex = styled.View`
  flex-direction: row;
  justify-content: flex-start;
`;

export default function ChangePassword({route, navigation }) {
  const { changePasswordToken } = route.params;
  const { login, logout } = useAuth();
  const { theme } = useTheme();

  const confirmPasswordInput = useRef();

  // States
  const [isAppReady, setIsAppReady] = useState(false);
  const [isChangePasswordEnable, setIsChangePasswordEnable] = useState(false);
  const [isPasswordMatched, setIsPasswordMatched] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setLoading } = useLoader();

  // Input Handler
  const updateInput = (setState, value) => {
    setState(value);
  };

  // Change Password Handler
  const changePasswordHandler = async () => {
    try {
      const {
        data: { data },
      } = await axios.post("/auth/change-password", {
        newPassword,
        changePasswordToken
      });
      
      alert(data.msg);
      navigation.goBack();
      navigation.goBack();
      navigation.goBack();
    } catch (e) {
      axios.handleError(e);
    }
  };

  const validatePassword = () => {
    setIsChangePasswordEnable(false)
    if (newPassword == "" || confirmPassword == "") {
        setIsPasswordMatched(null)
    } else if (newPassword != confirmPassword) {
        setIsPasswordMatched(false);
    } else {
        setIsChangePasswordEnable(true);
        setIsPasswordMatched(true)
    }
  }

  return (
    <Canvas>
      <Container style={{ flex: 1 }}>
        <Text fontSize="34" fontWeight="bold" style={{ marginTop: 10 }}>
          Meditate, Earn, Repeat
        </Text>
        <ZenbaseLogo source={ZentbaseLogoPrimary} />

        <InputWrapper>
          <Text>New Password</Text>
          <Input
            onEndEditing={validatePassword}
            style={[ isPasswordMatched === false && {borderWidth: 0.5, borderColor: '#FD3B30'}]}
            secureTextEntry={true}
            placeholderTextColor={theme.color.secondary}
            onChangeText={(value) => updateInput(setNewPassword, value)}
            value={newPassword}
            onSubmitEditing={() => {
              if (!(newPassword != "" && confirmPassword != "")) {
                confirmPasswordInput.current.focus();
              }
            }}
          />

          <Text style={{ marginTop: 10}}>Confirm Password</Text>
          <Input
            onEndEditing={validatePassword}
            style={[isPasswordMatched === false && {borderWidth: 0.5, borderColor: '#FD3B30'}]}
            placeholderTextColor={theme.color.secondary}
            onChangeText={(value) => updateInput(setConfirmPassword, value)}
            secureTextEntry={true}
            value={confirmPassword}
            ref={confirmPasswordInput}
          />

          {isPasswordMatched === false && <Text style={{ marginTop: 18, width: '100%', textAlign: 'center'}}>Passwords do not match</Text>}
        </InputWrapper>
      </Container>
      <FooterWrapper>
        <Container style={{ flex: 1 }}>
          <FooterFlex>
            <Button
              onPress={() => {
                navigation.goBack();
                navigation.goBack();
                navigation.goBack();
              }}
              variant="silent"
              fontSize="14"
              title="Back to login"
              style={{ marginTop: 8, marginBottom: 2 }}
            />
            <Button
              variant={isChangePasswordEnable ? "primary" : "disabled"}
              title="Change Password"
              block
              onPress={() => {
                if (isChangePasswordEnable) {
                  changePasswordHandler();
                }
              }}
            />
            <TermsAndPrivacyWrapper>
              {/* <TermsAndPrivacyFlex>
                <Text>By signing in you accept our </Text>
                <TouchableOpacity>
                  <Text
                    fontWeight="bold"
                    style={{ textDecorationLine: "underline" }}
                  >
                    Terms of use
                  </Text>
                </TouchableOpacity>
              </TermsAndPrivacyFlex>

              <TermsAndPrivacyFlex style={{ marginTop: 2 }}>
                <Text>and </Text>
                <TouchableOpacity>
                  <Text
                    fontWeight="bold"
                    style={{ textDecorationLine: "underline" }}
                  >
                    Privacy Policy
                  </Text>
                </TouchableOpacity>
              </TermsAndPrivacyFlex> */}
            </TermsAndPrivacyWrapper>
          </FooterFlex>
        </Container>
      </FooterWrapper>
    </Canvas>
  );
}
