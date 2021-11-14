import React, { useState } from "react";
import { Alert, Container, Canvas, Text, Button } from 'components';
import styled from 'styled-components/native';
import { ScrollView, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { useTheme } from "stores/theme";
import { SwipeListView } from 'react-native-swipe-list-view';

// Import Images
import SongImage from 'assets/images/song.png';

// Import Icons
import { Ionicons } from '@expo/vector-icons';

// Styled Component
const Header = styled.View`
    width: 100%;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center; 
`

// Delete Journal Component (Default)
export default function DeleteJournal({ route, navigation }) {
    // Theme Configuration
    const { theme } = useTheme();
    const { journal, index: journalIndex, deleteFunction } = route.params;

    const deleteJournal = () => {
        // Delete Journal Logic
        deleteFunction(journal, journalIndex);
        
        navigation.goBack()
    }

    return (
        <Canvas>
            <Header>
                <Button variant='silent' title="Cancel" onPress={() => navigation.goBack()} />
            </Header>
            <Container style={{ flex: 1 }}>
                <Text fontSize='h2' fontWeight='bold' style={{ marginTop: 8, marginBottom: 18 }}>{journal.title}</Text>
                <Text>{journal.description}</Text>
            </Container>
            <Container style={{ height: 124, backgroundColor: theme.color.hud, borderTopWidth: 1.2, borderTopColor: theme.color.informationBackground, marginBottom: -40, paddingTop: 28}}>
                <Button variant='danger' block title="Delete" onPress={deleteJournal} />
            </Container>
        </Canvas>
    );
}
