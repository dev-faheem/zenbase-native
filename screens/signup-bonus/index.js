import React, { useEffect } from "react";
import { Container, Canvas, Text, Button, ZentTokenBanner, Box } from 'components';
import styled from 'styled-components/native';
import { useTheme } from "stores/theme";
import { TouchableOpacity, Dimensions } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import * as Haptics from 'expo-haptics';

// Import Icons
import { Ionicons } from '@expo/vector-icons';

// Import Images
import ConfettiImage from 'assets/images/confetti.png';


// Styled Component

const BackgroundImage = styled.ImageBackground`
    width: 100%;
    height: 100%;
`

const WalletInfoWrapper = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const WalletInfoBody = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const WalletInfoFooter = styled.View`
  width: 100%;
  flex-direction: column;
  padding-bottom: ${props => props.theme.spacing.lg};
`

const Header = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-top: ${props => props.theme.spacing.sm};
    margin-bottom: ${props => props.theme.spacing.sm};
    margin-left: ${props => props.theme.spacing.sm};
`

// SignupBonus (Default)
export default function SignupBonus({ route, navigation }) {
    const { theme } = useTheme();
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    useEffect(() => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, [])

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
                    <WalletInfoWrapper>
                        <WalletInfoBody>
                            <Ionicons name='gift' size={34} style={{ marginBottom: 12 }} color='white' />
                            <Text fontSize='h2'>You’ve received 0.01 ZENT</Text>
                            <Text fontSize='md' style={{ marginTop: 5 }}>Thanks for creating an account!</Text>
                        </WalletInfoBody>
                        <WalletInfoFooter>
                            <Button title='Claim to Wallet' block onPress={() => { navigation.navigate('ReferFriends')}} />
                        </WalletInfoFooter>
                    </WalletInfoWrapper>
                </Container>
            </BackgroundImage>
        </Canvas>
    );
}
