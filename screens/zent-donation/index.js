import React, { useState } from "react";
import { Alert, Container, Canvas, Text, Button, ZentTokenBanner, Box } from 'components';
import styled from 'styled-components/native';
import { View, Platform } from 'react-native';
import { useTheme } from "stores/theme";

// Import images
import ZenbaseWhiteVector from 'assets/vectors/zenbase-white.png';

// Styled Component
const Header = styled.View`
    width: 100%;
    flex-direction: row-reverse; 
    position: absolute;
    top: ${() => Platform.OS == 'android' ? `10px` : `40px`};
    z-index: 1;
`

const DonationHeader = styled.View`
    width: 100%;
    flex: 2.5;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
`

const DonationFooter = styled.View`
    width: 100%;
    flex: 2;
`

/**
 * ****
 * Card
 * ****
 */
const CardWrapper = styled.View`
 flex: 1;
 width: 100%;
 flex-direction: column;
 justify-content: space-between;
 align-items: center;
`

const CardBody = styled.View`
 flex: 1;
 flex-direction: column;
 justify-content: center;
 align-items: center;
`

const CardFooter = styled.View`
 width: 100%;
 flex-direction: column;
 padding-bottom: ${props => props.theme.spacing.lg};
`

const ZenbaseLogo = styled.Image`
   width: 30px;
   height: 30px;
   margin-bottom: ${props => props.theme.spacing.lg};
`

// Zent Donation Component (Default)
export default function ZentDonation({ route, navigation }) {
    // Theme Configuration
    const { theme } = useTheme();

    const [isDonation, setIsDonation] = useState(false);

    return (
        <Canvas>
            <Header>
                {isDonation && <Button variant='silent' title="Cancel" onPress={() => navigation.goBack()} />}
            </Header>
            <Container style={{ flex: 1 }}>
                <DonationHeader>
                    <CardWrapper>
                        <CardBody>
                            <ZenbaseLogo source={ZenbaseWhiteVector} />
                            {isDonation ? (
                                <>
                                    <Text fontSize='h2' fontWeight='bold' style={{ textAlign: 'center', marginBottom: 10 }}>Level up your wellness regimen</Text>
                                    <View style={{ width: '80%' }}>
                                        <Text fontSize='md' style={{ textAlign: 'center' }}>Rewards for your mindfulness practice. All thanks to donations by people like you.</Text>
                                    </View>
                                </>
                            ) : (
                                <Text fontSize='h2' fontWeight='bold' style={{ textAlign: 'center' }}>Help us reward you for your wellness!</Text>
                            )}
                        </CardBody>
                    </CardWrapper>

                    <ZentTokenBanner tokens={20.13} usd={0} />
                </DonationHeader>
                <DonationFooter>
                    {isDonation ? (
                        <CardWrapper>
                            <CardBody style={{ justifyContent: 'flex-start'}}>
                                <Text fontSize='md' style={{ marginTop: 10, textAlign: 'center' }}>Most Popular</Text>
                            </CardBody>
                            <CardFooter>
                                <Button title='Donate' variant='disabled' block   />
                            </CardFooter>
                        </CardWrapper>
                    ) : (
                        <CardWrapper>
                            <CardBody>
                                <Text fontSize='md' style={{ textAlign: 'center' }}>Zenbase’s commitment to promoting mindfulness is possible thanks to donations from people like you.</Text>
                                <Text fontSize='15' style={{ marginTop: 20, textAlign: 'center' }}>Can we count on you?</Text>
                            </CardBody>
                            <CardFooter>
                                <Button title='Yes, donate my Zentoken!' block onPress={() => { setIsDonation(true) }} />
                                <Box h='10px'/>
                                <Button title='No' variant='secondary' block onPress={() => { navigation.goBack(); }} />
                            </CardFooter>
                        </CardWrapper>
                    )}

                </DonationFooter>
            </Container>
        </Canvas>
    );
}
