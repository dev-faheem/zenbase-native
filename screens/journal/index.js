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
const JournalHeader = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: ${props => props.theme.spacing.md}; 
`

const JournalList = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    padding-top: ${props => props.theme.spacing.sm};
    padding-left: ${props => props.theme.spacing.md};
    background-color: ${props => props.theme.color.hud};
`

const JournalListContent = styled.View`
    height: 55px;
    flex: 1;
    flex-direction: row;
    justify-content: flex-start;
    border-bottom-width: 1px;
    border-bottom-color: ${props => props.theme.color.informationBackground};
    margin-left: ${props => props.theme.spacing.sm};
    padding-bottom: 5px;
`

const JournalListImg = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: ${props => props.theme.borderRadius.md};
    margin-left: ${props => props.theme.spacing.sm};
    margin-right: ${props => props.theme.spacing.sm};
`

const JournalDeleteWrapper = styled.TouchableOpacity`
    flex: 1;
    flex-direction: row;
    justify-content: flex-end;
`

const JournalDeleteButton = styled.View`
    width: 70px;
    background-color: red;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

// Journal Component (Default)
export default function Journal({ route, navigation }) {
    // Theme Configuration
    const { theme } = useTheme();

    const journals = [
        {
            id: 1,
            title: 'Today Was A Good Day',
            date: '10/20/21',
            description: 'There are good ships, there are wood ships, there are ships that sail the sea, but the best ships are friendships, and may they always be.',
            zentValue: 0
        },
        {
            id: 2,
            title: 'Today Was A Good Day',
            date: '10/20/21',
            description: 'There are good ships, there are wood ships, there are ships that sail the sea, but the best ships are friendships, and may they always be.',
            zentValue: 0
        },
        {
            id: 3,
            title: 'Today Was A Good Day',
            date: '10/20/21',
            description: 'There are good ships, there are wood ships, there are ships that sail the sea, but the best ships are friendships, and may they always be.',
            zentValue: 0
        }
    ]

    return (
        <Canvas>
            <JournalHeader>
                <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                    <Ionicons name="ios-chevron-back" size={30} color={theme.color.primary} />
                </TouchableOpacity>
            </JournalHeader>
            <Container style={{ flex: 1 }}>
                <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
                    <Text fontSize='h2' fontWeight='bold' style={{ marginTop: 8, marginBottom: 18 }}>My Journal</Text>
                    <SwipeListView
                        closeOnRowOpen={true}
                        data={journals}
                        renderItem={(data, rowMap) => {
                            let listStyle = {}

                            if (data.index == 0) {
                                listStyle = {
                                    ...listStyle,
                                    borderTopLeftRadius: theme.borderRadius.lg,
                                    borderTopRightRadius: theme.borderRadius.lg,
                                }
                            }

                            if (data.index == (journals.length - 1)) {
                                listStyle = {
                                    ...listStyle,
                                    borderBottomLeftRadius: theme.borderRadius.lg,
                                    borderBottomRightRadius: theme.borderRadius.lg,
                                }
                            }

                            return <TouchableHighlight>
                                <JournalList style={listStyle}>
                                    <JournalListImg source={SongImage} resizeMode='cover' />
                                    <JournalListContent style={data.index == (journals.length - 1) ? { borderBottomWidth: 0 } : null}>
                                        <View style={{ width: '75%' }}>
                                            <Text numberOfLines={1} style={{ marginTop: 4 }}>{data.item.title}</Text>
                                            <Text color='information' numberOfLines={1} style={{ marginTop: 5 }} fontSize='sm'>{data.item.date} {data.item.description}</Text>
                                        </View>
                                        <View style={{ width: '25%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                            <Text numberOfLines={1} color='primary'>{data.item.zentValue} Zent</Text>
                                        </View>
                                    </JournalListContent>
                                </JournalList>
                            </TouchableHighlight>
                        }}
                        renderHiddenItem={(data, rowMap) => {
                            let deleteButtonStyle = {}

                            if (data.index == 0) {
                                deleteButtonStyle = {
                                    ...deleteButtonStyle,
                                    borderTopRightRadius: theme.borderRadius.xl,
                                }
                            }

                            if (data.index == (journals.length - 1)) {
                                deleteButtonStyle = {
                                    ...deleteButtonStyle,
                                    borderBottomRightRadius: theme.borderRadius.xl,
                                }
                            }

                            return <JournalDeleteWrapper onPress={() => {
                                navigation.navigate('DeleteJournal', data.item);
                            }}>
                                <JournalDeleteButton style={deleteButtonStyle}>
                                    <Ionicons name="trash" size={24} color={theme.color.white} style={{ marginLeft: 7 }} />
                                </JournalDeleteButton>
                            </JournalDeleteWrapper>
                        }}
                        disableRightSwipe
                        keyExtractor={(data, index) => {
                            return `${index}`;
                        }}
                        rightOpenValue={-60}
                        stopRightSwipe={-62}
                    />
                </ScrollView>
            </Container>
        </Canvas>
    );
}
