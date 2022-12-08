import React, { useState, useEffect } from "react";
import { Text, Container, Canvas, Button } from "components";
import styled from "styled-components/native";
import { useTheme } from "stores/theme";
import { TouchableOpacity, Image } from "react-native";
import SplashScreen from "screens/splash-screen";

// Import Images
import ZentbaseLogoWhite from "assets/images/zenbase-full-white-logo.png";
import ZentbaseVectorWhite from "assets/vectors/zenbase-white.png";
import AppleIcon from "assets/vectors/apple.png";
import GoogleIcon from "assets/vectors/google.png";

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

  // States
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    setTimeout(async () => {
      setIsAppReady(true);
    }, 3000);
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
          fontSize="14"
          title="Sign in with email."
          titleProps={{
            style: {
              fontWeight: "600",
            },
          }}
        />

        <Button
          onPress={() => {}}
          variant="secondary"
          block
          borderRadius={theme.borderRadius.lg}
          fontSize="14"
          title="Sign in with Apple"
          titleProps={{
            style: {
              fontWeight: "600",
            },
          }}
          image={
            <Image
              source={AppleIcon}
              resizeMethod="center"
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
          onPress={() => {}}
          variant="secondary"
          block
          borderRadius={theme.borderRadius.lg}
          fontSize="14"
          title="Sign in with Google"
          titleProps={{
            style: {
              fontWeight: "600",
            },
          }}
          image={
            <Image
              source={GoogleIcon}
              resizeMethod="center"
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
