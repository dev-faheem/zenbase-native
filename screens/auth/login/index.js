import React, { useState, useEffect } from "react";
import { Text, Container, Canvas, Button } from "components";
import styled from "styled-components/native";
import { useTheme } from "stores/theme";
import { TouchableOpacity, Image } from "react-native";
import SplashScreen from "screens/splash-screen";
import { Buffer } from "buffer";

// Import Images
import ZentbaseLogoWhite from "assets/images/zenbase-full-white-logo.png";
import ZentbaseVectorWhite from "assets/vectors/zenbase-white.png";
import AppleIcon from "assets/vectors/apple.png";
import GoogleIcon from "assets/vectors/google.png";
import { handleSignInWithApple } from "helpers/auth-apple";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { queryClient } from "query/client";
import { fetchHomepage } from "query/home";
import { useAuth } from "stores/auth";
import { CommonActions } from "@react-navigation/native";
import mixpanel from "services/mixpanel";
import { parseJwt } from "helpers/parse-jwt";
import axios from "services/axios";

// Styled Component
const ZenbaseLogo = styled.Image`
  width: 219px;
  height: 60px;
  margin-bottom: 60px;
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

const BottomView = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 70px;
`;

export default function Login({ navigation }) {
  const { theme } = useTheme();
  const { login, refresh } = useAuth();
  const [isAppReady, setIsAppReady] = useState(false);

  const handleAppleLogin = async () => {
    try {
      const credentials = await handleSignInWithApple();
      const identityToken = parseJwt(credentials?.identityToken);

      const { email: username, sub: password } = identityToken;

      const {
        data: { data },
      } = await axios.post("/auth/login", {
        username,
        password,
      });

      if (data.isVerified) {
        login(data);
        mixpanel.track("Login", data);

        // Reset Stack Navigation
        navigation.dispatch(
          CommonActions.reset({
            routes: [{ name: "App" }],
          })
        );
      } else {
        navigation.navigate("OTP", {
          type: "email",
          value: data.email,
          userId: data._id,
          data,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSignInWithGoogle = async () => {
    alert("Google Sign In is disabled.");
  };

  const fetchUserFromAsyncStorage = async () => {
    const serializedUser = await AsyncStorage.getItem("@zenbase_user");
    if (serializedUser !== null) {
      const _user = JSON.parse(serializedUser);
      console.log(`User found in AsyncStorage ${_user.name}`);

      try {
        const decoded = _user.token.split(".")[1];
        const jwt = JSON.parse(Buffer.from(decoded, "base64").toString("utf-8"));

        if (Date.now() >= jwt?.exp * 1000) {
          console.log(`AsyncStorage Token is expired`);
          await AsyncStorage.removeItem("@zenbase_user");
          return;
        }
      } catch (e) {
        console.error(e);
        return;
      }

      mixpanel.track("Auto Login", _user);
      await login(_user);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await fetchUserFromAsyncStorage();
        await refresh();
        navigation.dispatch(
          CommonActions.reset({
            routes: [{ name: "App" }],
          })
        );
      } catch (e) {
        setIsAppReady(true);
      }
    })();
  }, []);

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["home"],
      queryFn: fetchHomepage,
    });

    mixpanel.screen("Prelogin");
  }, []);

  if (!isAppReady) {
    return <SplashScreen />;
  }

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
        <Button
          onPress={() => navigation.navigate("LoginForm")}
          variant="silent"
          fontSize="16"
          title="Sign in with email"
          titleProps={{
            style: {
              fontWeight: "600",
            },
          }}
        />

        <Button
          onPress={handleAppleLogin}
          variant="secondary"
          block
          borderRadius="10"
          height="55"
          fontSize="16"
          title="Sign in with Apple"
          titleProps={{
            style: {
              fontWeight: "600",
            },
          }}
          image={
            <Image
              source={AppleIcon}
              resizeMode="contain"
              style={{
                width: 14.17,
                height: 17,
                marginRight: 8,
                marginTop: -2,
              }}
            />
          }
          style={{
            marginTop: 5.5,
            marginBottom: 5.5,
          }}
        />

        <Button
          onPress={handleSignInWithGoogle}
          variant="secondary"
          block
          borderRadius="10"
          height="55"
          fontSize="16"
          title="Sign in with Google"
          titleProps={{
            style: {
              fontWeight: "600",
            },
          }}
          image={
            <Image
              source={GoogleIcon}
              resizeMode="contain"
              style={{
                width: 17,
                height: 17,
                marginRight: 8,
              }}
            />
          }
          style={{
            marginTop: 5.5,
            marginBottom: 5.5,
          }}
        />

        <BottomView>
          <Image source={ZentbaseVectorWhite} style={{ width: 32, height: 32, marginBottom: 10 }} />
          <Text numberOfLines={1} adjustsFontSizeToFit fontSize="32" fontWeight="bold">
            Live Zen, Earn, Repeat
          </Text>
        </BottomView>
      </Container>
      <FooterWrapper>
        <Container style={{ flex: 1 }}>
          <FooterFlex>
            <FotterText>
              <FooterTextFlex>
                <Text>Don't have an account? </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Register")}
                  style={{ marginLeft: 3 }}
                >
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
