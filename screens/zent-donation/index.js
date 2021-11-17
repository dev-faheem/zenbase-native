import React, { useState } from "react";
import { Alert, Container, Canvas, Text, Button } from 'components';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { useTheme } from "stores/theme";

// Import Icons
import { Entypo } from '@expo/vector-icons';

// Styled Component
const Header = styled.View`
    width: 100%;
    flex-direction: row-reverse; 
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
                
            </Container>
        </Canvas>
    );
}
