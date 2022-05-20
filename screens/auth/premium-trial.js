import React from "react";
import { Text, Container, Canvas, Button, Box, PremiumCTA } from "components";
import styled from "styled-components/native";
import { useTheme } from "stores/theme";

// Import Images
import ConfettiImage from "assets/images/confetti.png";
import axios from "services/axios";

const BackgroundImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

const FooterWrapper = styled.View`
  width: 100%;
  height: 150px;
`;

const FooterFlex = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

export default function PremiumTrial({ navigation }) {
  const onPressStartExploring = async () => {
    try {
      await axios.post("/payments", {
        amount: 0,
        reason: "SIGNUP_BONUS",
        valid: true,
        premium: true,
      });

      navigation.goBack();
      navigation.navigate("ZenbaseAds", { isForLogin: true });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Canvas>
      <BackgroundImage source={ConfettiImage}>
        <Container style={{ flex: 1 }}>
          <Box h="70px" />
          <Text fontSize="22" fontWeight="600">
            You’ve received 1 week of Zenbase Premium!
          </Text>
          <PremiumCTA />
        </Container>
        <FooterWrapper>
          <Container style={{ flex: 1 }}>
            <FooterFlex>
              <Text style={{ marginBottom: 5, width: "100%" }}>
                You will not be charged after your trial expires.
              </Text>
              <Button
                style={{ marginTop: 3, marginBottom: 3 }}
                title="Start exploring"
                block
                onPress={onPressStartExploring}
              />
            </FooterFlex>
          </Container>
        </FooterWrapper>
      </BackgroundImage>
    </Canvas>
  );
}
