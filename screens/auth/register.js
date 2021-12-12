import React, { useState, useEffect, useRef } from "react";
import { Text, Container, Canvas, Button, Box } from "components";
import { useNavigation } from "@react-navigation/core";
import { StackActions, CommonActions } from "@react-navigation/native";
import styled from "styled-components/native";
import { useAuth } from "stores/auth";

// Import Images
import ZentbaseLogoPrimary from "assets/images/zenbase-full-primary-logo.png";
import { useTheme } from "stores/theme";
import { ScrollView, TouchableOpacity } from "react-native";
import Loader from "components/loader";
import { useLoader } from "stores/loader";
import axios from "services/axios";

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

export default function register({ navigation }) {
  const { theme } = useTheme();

  const passwordInput = useRef();

  const { setLoading, renderLoader } = useLoader();

  // States
  const [isRegisterEnabled, setIsRegisterEnabled] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  // Input Handler
  const updateInput = (setState, value) => {
    setState(value);
  };

  // Register Handler
  const registerHandler = async () => {
    setLoading(true);

    try {
      const {
        data: { data },
      } = await axios.post("/auth/register", {
        name,
        email,
        phone: phoneNumber,
        username,
        password,
      });
      axios.interceptors.request.use((config) => {
        config.headers.authorization = data?.token;
        return config;
      });
      login(data);
      navigation.navigate("SignupBonus");
    } catch (error) {
      axios.handleError(error);
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (email.trim() == "" || password == "") {
      setIsRegisterEnabled(false);
    } else {
      setIsRegisterEnabled(true);
    }
  }, [email, password]);

  return (
    <Canvas>
      {renderLoader()}
      <ScrollView>
        <Container style={{ flex: 1 }}>
          <Text fontSize="34" fontWeight="bold" style={{ marginTop: 10 }}>
            Meditate, Earn, Repeat
          </Text>
          <ZenbaseLogo source={ZentbaseLogoPrimary} />

          <InputWrapper>
            <Input
              autoCapitalize="none"
              placeholder="Name"
              placeholderTextColor={theme.color.secondary}
              onChangeText={setName}
              value={name}
              // onSubmitEditing={() => passwordInput.current.focus()}
            />
            <Input
              autoCapitalize="none"
              placeholder="Username"
              placeholderTextColor={theme.color.secondary}
              onChangeText={setUsername}
              value={username}
              // onSubmitEditing={() => passwordInput.current.focus()}
            />
            <Input
              autoCapitalize="none"
              placeholder="Phone Number"
              placeholderTextColor={theme.color.secondary}
              onChangeText={setPhoneNumber}
              value={phoneNumber}
              // onSubmitEditing={() => passwordInput.current.focus()}
            />
            <Input
              autoCapitalize="none"
              placeholder="Email"
              placeholderTextColor={theme.color.secondary}
              onChangeText={(value) => updateInput(setEmail, value)}
              value={email}
              onSubmitEditing={() => passwordInput.current.focus()}
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
              onPress={() => navigation.goBack()}
              variant="silent"
              fontSize="14"
              title="Already have an account"
              style={{ marginTop: 8 }}
            />
          </InputWrapper>
        </Container>
        <FooterWrapper>
          <Container style={{ flex: 1 }}>
            <FooterFlex>
              <Box h="60px" />
              <Button
                variant={isRegisterEnabled ? "primary" : "disabled"}
                title="Continue"
                block
                onPress={() => {
                  if (isRegisterEnabled) {
                    registerHandler();
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
      </ScrollView>
    </Canvas>
  );
}
