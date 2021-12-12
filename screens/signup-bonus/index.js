import React, { useEffect } from "react";
import {
  Container,
  Canvas,
  Text,
  Button,
  ZentTokenBanner,
  Box,
} from "components";
import styled from "styled-components/native";
import { useTheme } from "stores/theme";
import { TouchableOpacity, Dimensions } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import * as Haptics from "expo-haptics";

// Import Icons
import { Ionicons } from "@expo/vector-icons";

// Import Images
import ConfettiImage from "assets/images/confetti.png";
import { useAuth } from "stores/auth";

// Styled Component

const BackgroundImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

const InfoWrapper = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const InfoBody = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
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

// SignupBonus (Default)
export default function SignupBonus({ route, navigation }) {
  const { theme } = useTheme();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const { user, giveToken } = useAuth();

  useEffect(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, []);


  return (
      <Canvas>
          <BackgroundImage source={ConfettiImage} resizeMode='cover'>
              <ConfettiCannon count={100} fallSpeed={2000} origin={{ x: windowWidth/2, y: windowHeight - 100 }} fadeOut />
              <Header>
                  <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                      <Ionicons name="ios-chevron-back" size={30} color={theme.color.primary} />
                  </TouchableOpacity>
              </Header>
              <Container style={{ flex: 1 }}>
                  <ZentTokenBanner tokens={0.01} usd={0.00} />
                  <InfoWrapper>
                      <InfoBody>
                          <Ionicons name='gift' size={34} style={{ marginBottom: 12 }} color='white' />
                          <Text fontSize='h2' fontWeight='bold'>You’ve received 0.01 ZENT</Text>
                          <Text fontSize='md' style={{ marginTop: 5 }}>Thanks for creating an account!</Text>
                      </InfoBody>
                      <InfoFooter>
                          <Button title='Claim to wallet' block onPress={() => { navigation.navigate('ReferFriends')}} />
                      </InfoFooter>
                  </InfoWrapper>
              </Container>
          </BackgroundImage>
      </Canvas>
  );

}
