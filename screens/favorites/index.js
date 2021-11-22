// Import Dependencies
import React, { useState } from "react";
import { Alert, ScrollView, View, TouchableOpacity } from 'react-native';
import { Text, Container, Canvas, Button, IOSList, SongTile } from "components";
import styled from "styled-components/native";
import { useTheme } from 'stores/theme';

// Import Images
import MeditateImage from 'assets/images/favorites/meditate.png';
import ChillImage from 'assets/images/favorites/chill.png';

// Styled Component
const Header = styled.View`
    width: 100%;
    flex-direction: row-reverse;
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

const ListImage = styled.Image`
  width: 51px;
  height: 30px;
  border-radius: ${props => props.theme.borderRadius.md};
`

export default function Favorites({ route, navigation }) {
  const { theme } = useTheme();

  const [isEdit, setIsEdit] = useState(false);

  return (
    <Canvas >
      <ScrollView style={{ flex: 1 }}>
          <Header>
            <Button variant={'silent'} title={isEdit ? 'Done' : 'Edit'} onPress={() => setIsEdit(!isEdit)} />
          </Header>
        <Container style={{ flex: 1 }}>
          <Text fontWeight="bold" fontSize="h2" >Liked Tracks</Text>
          {
            !isEdit && <IOSList style={{ marginTop: 20, marginBottom: 10 }} notDefault  transparent data={[
              {
                icon: <ListImage source={MeditateImage}/>, 
                title: 'Meditate',
                onPress: () => {
                  navigation.navigate('FavoritesType', {type: 'Meditate'});
                }
              },
              {
                icon: <ListImage source={ChillImage}/>,
                title: 'Chill',
                onPress: () => {
                  navigation.navigate('FavoritesType', {type: 'Chill'});
                }
              }
            ]} />
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
