import React, { useState } from "react";
import { Container, Text } from 'components';
import styled from 'styled-components/native';

import { BlurView } from 'expo-blur';
import { SafeAreaView, TouchableOpacity } from "react-native";

// Import Icons
import { Ionicons } from '@expo/vector-icons';

// Styled Components



// Add Journal Component (Default)
export default function AddJournal({ route, navigation }) {
    return <BlurView intensity={200} tint="dark" style={{ width: '100%', height: '100%'}}>
        <SafeAreaView>
            <TouchableOpacity onPress={() => { navigation.goBack(); }} style={{ marginLeft: 10}}>
                <Ionicons name="ios-chevron-back" size={30} color='white' />
            </TouchableOpacity>
            <Container>
                
            </Container>
        </SafeAreaView>
    </BlurView>
}
