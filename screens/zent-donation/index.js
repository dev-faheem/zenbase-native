import React, { useState } from "react";
import { Alert, Container, Canvas, Text, Button, ZentTokenBanner } from 'components';
import styled from 'styled-components/native';
import { View, Platform } from 'react-native';
import { useTheme } from "stores/theme";

// Import Icons
import { Entypo } from '@expo/vector-icons';

// Styled Component
const Header = styled.View`
    width: 100%;
    flex-direction: row-reverse; 
    position: absolute;
    top: ${() => Platform.OS == 'android' ? `10px`: `40px`};
    z-index: 1;
`

const DonationHeader = styled.View`
    width: 100%;
    flex: 3;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
`

const DonationFooter = styled.View`
    width: 100%;
    flex: 2.2;
`

// Zent Donation Component (Default)
export default function ZentDonation({ route, navigation }) {
    // Theme Configuration
    const { theme } = useTheme();

    return (
        <Canvas>
            <Header>
                <Button variant='silent' title="Cancel" onPress={() => navigation.goBack()} />
            </Header>
            <Container style={{ flex: 1 }}>
                <DonationHeader>
                    {/* <View style={{flex: 1, width: '100%', backgroundColor: 'red'}}></View> */}
                    <ZentTokenBanner tokens={20.13} usd={0}/>
                </DonationHeader>
                <DonationFooter>

                </DonationFooter>
            </Container>
        </Canvas>
    );
}
