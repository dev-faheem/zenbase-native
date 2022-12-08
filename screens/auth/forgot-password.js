import React, { useState, useEffect, useRef } from "react";
import { Text, Container, Canvas, Button } from "components";
import styled from "styled-components/native";
import { useTheme } from "stores/theme";
import { TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "services/axios";

// Styled Component
const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 12px;
  margin-bottom: 12px;
`;

const ZenbaseLogo = styled.Image`
  width: 219px;
  height: 60px;
  margin-bottom: 35px;
`;

const InputWrapper = styled.View`
  width: 100%;
  margin-top: 40px;
`;

const Input = styled.TextInput`
  width: 100%;
  height: 40px;
  padding: 8px;
  border-radius: 7.5px;
  background-color: ${(props) => props.theme.color.hud};
  color: ${(props) => props.theme.color.white};
  margin-top: 5px;

  border-left-color: ${(props) => props.theme.color.red};
  border-left-width: 10px;
`;

const FooterWrapper = styled.View`
  width: 100%;
  height: 65px;
`;

const FooterFlex = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const FotterText = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 16px;
`;

const FooterTextFlex = styled.View`
  flex-direction: row;
  justify-content: flex-start;
`;

const BottomPadding = styled.View`
  padding-top: 60px;
`;

export default function LoginForm({ navigation }) {
  const { theme } = useTheme();

  const [error, setError] = useState("");

  // States
  const [email, setEmail] = useState("");

  // Input Handler
  const updateInput = (setState, value) => {
    setState(value);
  };

  // Change Password Handler
  const forgotPassword = async () => {
    try {
      let type = "phoneNumber"; // or email
      if (/[a-zA-Z]/g.test(email)) {
        type = "email";
      }

      const value = email;

      const { data } = await axios.post("/auth/generate-otp", {
        username: email,
      });

      navigation.navigate("OTP", {
        type,
        value,
        userId: data.data.userId,
        isForChangePassword: true,
      });
    } catch (e) {
      setError(e?.response?.data?.error);
    }
  };

  return (
    <Canvas>
      <Header>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="ios-chevron-back" size={30} color={theme.color.primary} />
        </TouchableOpacity>
      </Header>
      <Container
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Ionicons name="lock-closed" size={36} color="white" />
        <Text fontSize={"24"} fontWeight="bold" style={{ marginTop: 8 }}>
          Trouble logging in?
        </Text>
        <Text style={{ textAlign: "center", marginTop: 8, marginBottom: 10 }}>
          Enter your email and we’ll send you a link to get your account back.
        </Text>
        <InputWrapper>
          <Text>Email</Text>
          <Input
            style={{
              ...(Boolean(error) ? { borderLeftWidth: 10 } : { borderLeftWidth: 0 }),
            }}
            returnKeyType="done"
            placeholder=""
            autoCapitalize="none"
            selectionColor={theme.color.primary}
            placeholderTextColor={theme.color.secondary}
            onChangeText={(value) => updateInput(setEmail, value)}
            value={email}
          />
        </InputWrapper>

        <InputWrapper
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <Text fontWeight="600">{Boolean(error) && error} </Text>
        </InputWrapper>

        <Button
          title="Next"
          block
          style={{ marginTop: 6, marginBottom: 6 }}
          onPress={() => {
            forgotPassword();
          }}
        />

        <BottomPadding></BottomPadding>
      </Container>
      <FooterWrapper>
        <Container style={{ flex: 1 }}>
          <FooterFlex>
            <FotterText>
              <FooterTextFlex>
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <Text color="primary" fontWeight="bold">
                    Back to log in
                  </Text>
                </TouchableOpacity>
              </FooterTextFlex>
            </FotterText>
          </FooterFlex>
        </Container>
      </FooterWrapper>
    </Canvas>
  );
}
