// Import Dependencies
import React from "react";
import { Alert, ScrollView, View } from 'react-native';
import { Text, Container, Canvas, Button, IOSList, SongTile } from "components";
import styled from "styled-components/native";
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from 'stores/theme';

// Import Images
import profileImage from 'assets/images/artist.png';

// Import Profile Header
import MiniProfileHeader from "screens/profile/header/mini";

export default function Followers({ route, navigation }) {
    const { theme } = useTheme();
    const { title } = route.params;

    return (
        <View>
            <MiniProfileHeader 
                profilePicture={profileImage} 
                route={route} 
                navigation={navigation} 

                backButton={true}

                secondaryButton='Done'
                secondaryButtonOnPress={() => {
                    
                }}
            />
            <Canvas>
                <ScrollView style={{ flex: 1 }}>
                    <Container style={{ flex: 1 }}>
                        <Text fontWeight="bold" fontSize="h2" style={{ marginTop: 22 }}>{title}</Text>
                    </Container>
                </ScrollView>
            </Canvas>
        </View>
    );
}
