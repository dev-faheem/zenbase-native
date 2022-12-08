import React, { useState, useEffect, useRef } from "react";
import { Text, Container, Canvas, Button } from "components";
import styled from "styled-components/native";
import { useTheme } from "stores/theme";
import { TouchableOpacity, Image } from "react-native";

// Import Images
import ZentbaseLogoWhite from "assets/images/zenbase-full-white-logo.png";
import ZentbaseVectorWhite from "assets/vectors/zenbase-white.png";
import AppleIcon from "assets/vectors/apple.png";
import GoogleIcon from "assets/vectors/google.png";

// Styled Component
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

  const [isLoginEnabled, setIsLoginEnabled] = useState(false);
  const [phoneNumberOrEmail, setPhoneNumberOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const passwordInput = useRef();

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

  return (
    <Canvas>
      <Container
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <ZenbaseLogo source={ZentbaseLogoWhite} />
        <InputWrapper>
          <Text>Email</Text>
          <Input
            returnKeyType="done"
            autoCapitalize="none"
            selectionColor={theme.color.primary}
            placeholder=""
            placeholderTextColor={theme.color.secondary}
            onChangeText={(value) => updateInput(setPhoneNumberOrEmail, value)}
            value={phoneNumberOrEmail}
            onSubmitEditing={() => {
              if (!(phoneNumberOrEmail != "" && password != "")) {
                passwordInput.current.focus();
              }
            }}
          />

          <Text style={{ marginTop: 20 }}>Password</Text>
          <Input
            returnKeyType="done"
            placeholder=""
            selectionColor={theme.color.primary}
            placeholderTextColor={theme.color.secondary}
            onChangeText={(value) => updateInput(setPassword, value)}
            secureTextEntry={true}
            value={password}
            ref={passwordInput}
          />
        </InputWrapper>

        <InputWrapper
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
            style={{ paddingTop: 10, paddingBottom: 10 }}
          >
            <Text color={"primary"} fontWeight="600">
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </InputWrapper>

        <Button
          variant={isLoginEnabled ? "primary" : "disabled"}
          title="Sign in"
          block
          style={{ marginTop: 6, marginBottom: 6 }}
          onPress={() => {
            if (isLoginEnabled) {
              loginHandler();
            }
          }}
        />

        <BottomPadding></BottomPadding>
      </Container>
      <FooterWrapper>
        <Container style={{ flex: 1 }}>
          <FooterFlex>
            <FotterText>
              <FooterTextFlex>
                <Text>Don't have an account? </Text>
                <TouchableOpacity>
                  <Text color="primary" fontWeight="bold">
                    Sign Up.
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
