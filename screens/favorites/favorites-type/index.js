// Import Dependencies
import React, { useState } from "react";
import { Alert, ScrollView, View, TouchableOpacity } from 'react-native';
import { Text, Container, Canvas, Button, IOSList, SongTile } from "components";
import styled from "styled-components/native";
import { useTheme } from 'stores/theme';
import { Ionicons } from '@expo/vector-icons';

// Styled Component
const Header = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center; 
`

// Styled Component
const SongListWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`

const ButtonWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding-top: ${props => props.theme.spacing.xl};
`

const CustomButton = styled.TouchableOpacity`
  width: 47.5%;
  height: 42px;
  background-color: ${props => props.theme.color.hud};
  border-radius: ${props => props.theme.borderRadius.md};
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

export default function FavoritesType({ route, navigation }) {
    const { theme } = useTheme();

    const { type } = route.params;

    const [isEdit, setIsEdit] = useState(false);

    return (
        <Canvas >
            <ScrollView style={{ flex: 1 }}>
                <Header>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack(); 
                        setIsEdit(false)
                    }}>
                        <Ionicons name="ios-chevron-back" size={30} color={theme.color.primary} />
                    </TouchableOpacity>
                    <Button variant={'silent'} title={isEdit ? 'Done' : 'Edit'} onPress={() => setIsEdit(!isEdit)} />
                </Header>
                <Container style={{ flex: 1 }}>
                    <Text fontWeight="bold" fontSize="h2" >{type}</Text>
                    {
                        !isEdit && <ButtonWrapper>
                            <CustomButton>
                                <Ionicons name="ios-play" size={24} color={theme.color.primary} style={{ marginRight: 4 }} />
                                <Text color="primary">Play</Text>
                            </CustomButton>
                            <CustomButton>
                                <Ionicons name="shuffle-outline" size={24} color={theme.color.primary} style={{ marginRight: 4 }} />
                                <Text color="primary">Shuffle</Text>
                            </CustomButton>
                        </ButtonWrapper>
                    }

                    <SongListWrapper style={{ marginTop: 20 }}>
                        <SongTile style={{ marginBottom: 20 }} inGrid mock removable={isEdit} onRemove={() => { }} />
                        <SongTile style={{ marginBottom: 20 }} inGrid mock removable={isEdit} onRemove={() => { }} />
                        <SongTile style={{ marginBottom: 20 }} inGrid mock removable={isEdit} onRemove={() => { }} />
                        <SongTile style={{ marginBottom: 20 }} inGrid mock removable={isEdit} onRemove={() => { }} />
                        <SongTile style={{ marginBottom: 20 }} inGrid mock removable={isEdit} onRemove={() => { }} />
                        <SongTile style={{ marginBottom: 20 }} inGrid mock removable={isEdit} onRemove={() => { }} />
                    </SongListWrapper>
                </Container>
            </ScrollView>
        </Canvas>
    );
}
