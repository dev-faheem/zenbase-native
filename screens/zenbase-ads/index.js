import React from "react";
import { Container, Canvas, Text, Button, ZentTokenBanner, Box } from 'components';
import styled from 'styled-components/native';
import { TouchableOpacity } from "react-native";
import { useTheme } from "stores/theme";

// Import Icons
import { Ionicons, FontAwesome } from '@expo/vector-icons';

// Import Images
import AdVector from 'assets/vectors/ad-white.png';
import AdInformationImage from 'assets/images/zenbase-ads-info.png';

// Styled Component
const AdInfoWrapper = styled.View`
    width: 100%;
    height: 130px;
    border-radius: ${props => props.theme.borderRadius.lg};
    background-color: ${props => props.theme.color.hud};
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const AdInfoImage = styled.Image`
    height: 90px;
    width: 100%;
`

const InfoWrapper = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const InfoBody = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const InfoFooter = styled.View`
  width: 100%;
  flex-direction: column;
  padding-bottom: ${props => props.theme.spacing.lg};
`

const InfoLogo = styled.Image`
    width: 40px;
    height: 30px;
    margin-bottom: ${props => props.theme.spacing.md};
`

const AdsOptions = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 36px;
`

const Header = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-left: ${props => props.theme.spacing.sm};
`


// ZenbaseAds (Default)
export default function ZenbaseAds({ route, navigation }) {
    const { theme } = useTheme();

    const { isForLogin } = route.params;

    return (
        <Canvas>
            {!isForLogin && <Header>
                <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                    <Ionicons name="ios-chevron-back" size={30} color={theme.color.primary} />
                </TouchableOpacity>
            </Header>}
            <Container style={{ flex: 1 }}>
                <ZentTokenBanner tokens={0.01} usd={0.00} />
                <AdInfoWrapper>
                    <AdInfoImage source={AdInformationImage} resizeMode='contain' />
                </AdInfoWrapper>
                <InfoWrapper>
                    <InfoBody>
                        <InfoLogo source={AdVector} resizeMode='center' />
                        <Text fontSize='h2' fontWeight='bold'>More Ads, More Earnings</Text>
                        <Text fontSize='md' style={{ marginTop: 5 }}>Select Ads per session.</Text>
                        <AdsOptions>
                            <Button horizontalPadding='0' width='113' title='Less (1)'/>
                            <Button horizontalPadding='0' width='113' title='Moderate (2)' variant='primaryDark'/>
                            <Button horizontalPadding='0' width='113' title='Max (3)' variant='primaryDarker'/>
                        </AdsOptions>
                    </InfoBody>
                    <InfoFooter>

                        <Text color='information' fontSize='sm' style={{ marginBottom: 10 }}>You’re using Zenbase Premium! You can opt-out of Ads.</Text>
                        {isForLogin ?
                            <Button title='Set up later' variant='secondary' block onPress={() => { }} />
                            :
                            <Button title='No Ads' variant='secondary' block onPress={() => { }} />
                        }
                    </InfoFooter>
                </InfoWrapper>
            </Container>

        </Canvas>
    );
}
