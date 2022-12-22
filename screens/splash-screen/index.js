import React from "react";
import { Text } from "components";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";

// Import images
import ZentBackground from "assets/images/wallet/zent-bg-lg.png";
import ZenbaseFullLogo from "assets/images/zenbase-full-white-logo.png";
import { useAuth } from "stores/auth";

// Styled Component
const BackgroundWrapper = styled.ImageBackground`
  flex: 1;
  width: 100%;
  background-color: ${(props) => props.theme.color.background};
`;

const ZenbaseLogo = styled.Image`
  width: 261px;
  height: 71px;
`;

/**
 * ****
 * Card
 * ****
 */
const CardWrapper = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const CardBody = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CardFooterMargin = styled.View`
  height: 20%;
`;

// Splash Screen (Default)
export default function SplashScreen({ route, navigation }) {
  return (
    <BackgroundWrapper source={ZentBackground}>
      <CardWrapper>
        <CardBody>
          <ZenbaseLogo source={ZenbaseFullLogo} resizeMode="contain" />
          {/* <Ionicons name="heart" size={48} color='white' style={{ marginTop: 60 }} /> */}
          <ActivityIndicator size="large" color="#fff" style={{ marginTop: 70 }} />
          <Text
            fontSize="xl"
            fontWeight="500"
            style={{ marginTop: 20, textAlign: "center" }}
            color="white"
          >
            Today is a beautiful day to take care{" "}
          </Text>
          <Text
            fontSize="xl"
            fontWeight="500"
            style={{ marginTop: 5, textAlign: "center" }}
            color="white"
          >
            of yourself.
          </Text>
        </CardBody>
        <CardFooterMargin />
      </CardWrapper>
    </BackgroundWrapper>
  );
}
