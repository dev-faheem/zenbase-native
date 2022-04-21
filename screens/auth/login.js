import React, { useState, useEffect, useRef } from "react";
import { Text, Container, Canvas, Button } from "components";
import { StackActions, CommonActions } from "@react-navigation/native";
import styled from "styled-components/native";
import { useAuth } from "stores/auth";
import { useTheme } from "stores/theme";
import { ScrollView, TouchableOpacity } from "react-native";
import axios from "services/axios";
import SplashScreen from "screens/splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  margin-top: ${(props) => props.theme.spacing.md};
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

export default function Login({ navigation }) {
  const { login, logout } = useAuth();
  const { theme } = useTheme();

  const passwordInput = useRef();

  // States
  const [isAppReady, setIsAppReady] = useState(false);
  const [isLoginEnabled, setIsLoginEnabled] = useState(false);
  const [phoneNumberOrEmail, setPhoneNumberOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoading } = useLoader();

  // Input Handler
  const updateInput = (setState, value) => {
    setState(value);
  };

  // Login Handler
  const loginHandler = async () => {
    try {
      const {
        data: { data },
      } = await axios.post("/auth/login", {
        username: phoneNumberOrEmail,
        password,
      });

      login(data);

      // Reset Stack Navigation
      navigation.dispatch(
        CommonActions.reset({
          routes: [{ name: "App" }],
        })
      );
    } catch (e) {
      axios.handleError(e);
    }
  };

  useEffect(() => {
    if (phoneNumberOrEmail.trim() == "" || password == "") {
      setIsLoginEnabled(false);
    } else {
      setIsLoginEnabled(true);
    }
  }, [phoneNumberOrEmail, password]);

  useEffect(() => {
    setTimeout(() => {
      setIsAppReady(true);
    }, 3000);

    fetchUserFromAsyncStorage();
  }, []);

  const fetchUserFromAsyncStorage = async () => {
    const serializedUser = await AsyncStorage.getItem("@zenbase_user");
    if (serializedUser !== null) {
      const oldUser = JSON.parse(serializedUser);
      // console.log({ oldUser });
    } else {
      console.log("No user was found in async store.");
    }
  };

  if (!isAppReady) {
    return <SplashScreen />;
  }

  return (
    <Canvas>
      <Container style={{ flex: 1 }}>
        <Text fontSize="34" fontWeight="bold" style={{ marginTop: 10 }}>
          Meditate, Earn, Repeat
        </Text>
        <ZenbaseLogo source={ZentbaseLogoPrimary} />

        <InputWrapper>
          <Input
            autoCapitalize="none"
            placeholder="Phone number or email"
            placeholderTextColor={theme.color.secondary}
            onChangeText={(value) => updateInput(setPhoneNumberOrEmail, value)}
            value={phoneNumberOrEmail}
            onSubmitEditing={() => {
              if (!(phoneNumberOrEmail != "" && password != "")) {
                passwordInput.current.focus();
              }
            }}
          />

          <Input
            placeholder="Password"
            placeholderTextColor={theme.color.secondary}
            onChangeText={(value) => updateInput(setPassword, value)}
            secureTextEntry={true}
            value={password}
            ref={passwordInput}
          />

          <Button
            onPress={() => navigation.navigate("ForgotPassword")}
            variant="silent"
            fontSize="14"
            title="Forgot Password?"
            style={{ marginTop: 8 }}
          />
        </InputWrapper>
      </Container>
      <FooterWrapper>
        <Container style={{ flex: 1 }}>
          <FooterFlex>
            <Button
              onPress={() => navigation.navigate("Register")}
              variant="silent"
              fontSize="14"
              title="Create an account"
              style={{ marginTop: 8, marginBottom: 2 }}
            />
            <Button
              variant={isLoginEnabled ? "primary" : "disabled"}
              title="Sign in"
              block
              onPress={() => {
                if (isLoginEnabled) {
                  loginHandler();
                }
              }}
            />
            <TermsAndPrivacyWrapper>
              <TermsAndPrivacyFlex>
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
              </TermsAndPrivacyFlex>
            </TermsAndPrivacyWrapper>
          </FooterFlex>
        </Container>
      </FooterWrapper>
    </Canvas>
  );
}
