import React, { useEffect } from "react";
import { Container, Canvas, Text, Button, ZentTokenBanner, Box } from "components";
import styled from "styled-components/native";
import { useTheme } from "stores/theme";
import { TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Import Images
import ConfettiImage from "assets/images/confetti.png";
import PremiumDescriptionImage from "assets/images/cta/premium-features.png";
import PremiumLogo from "assets/logos/premium.png";

// Styled Component
const Wrapper = styled.View`
  width: 100%;
  height: 100%;
`;

const BackgroundConfetti = styled.Image`
  width: 100%;
  height: 100%;
  top: -60%;
  position: absolute;
`;

const InfoWrapper = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
`;

const InfoBody = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 25px;
  align-items: center;
`;

const InfoFooter = styled.View`
  width: 100%;
  flex-direction: column;
  padding-bottom: ${(props) => props.theme.spacing.lg};
`;

const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-left: ${(props) => props.theme.spacing.sm};
`;

const DescriptionWrapper = styled.View`
  width: 100%;
  height: 350px;
  background-color: #1e1f20;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;

const Description = styled.Image`
  width: 267px;
  height: 260px;
`;

const Logo = styled.Image`
  width: 254px;
  height: 60px;
  margin-bottom: 43px;
`;

export default function UpgradePremium({
  route,
  text = "Upgrade your account to Zenbase Premium.",
  navigation,
}) {
  const { previousScreenName } = route.params;
  const { theme } = useTheme();
  return (
    <Canvas>
      <Wrapper>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 5,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="ios-chevron-back" size={26} color={theme.color.primary} />
          <Text color="primary" fontSize={16} fontWeight={600}>
            {previousScreenName}
          </Text>
        </TouchableOpacity>
        <Container style={{ flex: 1 }}>
          <InfoWrapper>
            <InfoBody>
              <Logo source={PremiumLogo} resizeMode="contain" />
              <Text
                fontWeight="600"
                fontSize="22"
                style={{ textAlign: "center", marginBottom: 45 }}
              >
                {text}
              </Text>
              <DescriptionWrapper>
                <Description source={PremiumDescriptionImage} resizeMode="contain" />
              </DescriptionWrapper>
            </InfoBody>
            <InfoFooter>
              <Button height="55" title="Buy ($4.99 per month)" block onPress={() => {}} />
            </InfoFooter>
          </InfoWrapper>
        </Container>
      </Wrapper>
    </Canvas>
  );
}
