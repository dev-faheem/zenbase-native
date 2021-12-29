import React, { useState } from "react";
import { Box, Container, Text } from 'components';
import styled from 'styled-components/native';

import { BlurView } from 'expo-blur';
import { SafeAreaView, ScrollView, TouchableOpacity, Dimensions } from "react-native";

// Import Icons
import { Ionicons, Entypo } from '@expo/vector-icons';

// Import Images
import SongImage from 'assets/images/song.png';
import SongImage2 from 'assets/images/wallpapers/wallpaper-1.png';

// Styled Components
const SongTileWrapper = styled.View`
    position: relative;
    margin-right: ${props => props.theme.spacing.md};
    ${props => {
        const size = (Dimensions.get("window").width - 40) * 0.5;
        if (size < 185) {
            return `
                width: ${size}px;
                height: ${size}px;
            `;
        }

        return `
            width: 185px;
            height: 185px;
        `;
    }}
`

const SongTile = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: ${props => props.theme.borderRadius.lg};
`

const SongTimeWrapper = styled.Text`
    position: absolute;
    top: 10;
    width: 100%;
    text-align: right;
    color: white;
    padding-right: 10px;
    font-weight: 600;
`

const EmojiWrapper = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 25px;
    margin-bottom: 25px;
`

const Emoji = styled.TouchableOpacity`
    width: 70px;
    height: 70px;
    border-color: rgba(247,248,250, 0.6);
    border-width: 1px;
    border-radius: 100px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

// Add Journal Component (Default)
export default function AddJournal({ route, navigation }) {

    const [emotion, setEmotion] = useState(null);

    return <BlurView intensity={200} tint="dark" style={{ width: '100%', height: '100%' }}>
        <SafeAreaView>
            <TouchableOpacity onPress={() => { navigation.goBack(); }} style={{ marginLeft: 10 }}>
                <Ionicons name="ios-chevron-back" size={30} color='white' />
            </TouchableOpacity>
            <Container>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    style={{ width: '100%', marginTop: 50 }}
                    horizontal={true}
                >
                    <Box w={`${Dimensions.get('window').width * 0.23}px`} />
                    <SongTileWrapper>
                        <SongTile source={SongImage} />
                        <SongTimeWrapper>20 min</SongTimeWrapper>
                    </SongTileWrapper>
                    <SongTileWrapper>
                        <SongTile source={SongImage} />
                        <SongTimeWrapper>20 min</SongTimeWrapper>
                    </SongTileWrapper>
                </ScrollView>

                <Text fontSize="22" fontWeight='600' style={{
                    marginTop: 25,
                    width: '100%',
                    textAlign: 'center',
                    color: 'rgba(247,248,250, 0.9)',
                }}>
                    How are you feeling today?
                </Text>

                <EmojiWrapper>
                    <Emoji style={[
                        { borderWidth: emotion == 'happy' ? 1 : 0 },
                        (emotion == 'happy' && { shadowColor: 'white', shadowRadius: 8, shadowOpacity: 0.8 })
                    ]} onPress={() => setEmotion('happy')}>
                        <Entypo name={`emoji-happy`} size={36} color='rgba(254,254,254, 0.9)' />
                    </Emoji>

                    <Emoji style={[
                        { borderWidth: emotion == 'neutral' ? 1 : 0 },
                        (emotion == 'neutral' && { shadowColor: 'white', shadowRadius: 8, shadowOpacity: 0.8 })
                    ]} onPress={() => setEmotion('neutral')}>
                        <Entypo name={`emoji-neutral`} size={36} color='rgba(254,254,254, 0.9)' />
                    </Emoji>

                    <Emoji style={[
                        { borderWidth: emotion == 'sad' ? 1 : 0 },
                        (emotion == 'sad' && { shadowColor: 'white', shadowRadius: 8, shadowOpacity: 0.8 })
                    ]} onPress={() => setEmotion('sad')}>
                        <Entypo name={`emoji-sad`} size={36} color='rgba(254,254,254, 0.9)' />
                    </Emoji>
                </EmojiWrapper>


            </Container>
        </SafeAreaView>
    </BlurView>
}
