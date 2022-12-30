// Import Dependencies
import React, { useState, useRef, useEffect } from "react";
import { ScrollView, Platform, View, TouchableOpacity, FlatList } from "react-native";
import { Text, Container, Canvas, Button, IOSList, SongTile, NavigationPadding } from "components";
import styled from "styled-components/native";
import { BlurView } from "expo-blur";
import Constants from "expo-constants";
import { Entypo } from "@expo/vector-icons";

// Import Icons
import { Ionicons } from "@expo/vector-icons";

// Import Images
import MeditateImage from "assets/images/favorites/meditate.png";
import ChillImage from "assets/images/favorites/chill.png";
import { useTheme } from "stores/theme";
import SongListFilter from "./SongListFilter";
import { fetchPagedCategorySongs, useQueryPagedCategorySongs } from "query/songsQuery";
import { useQuery } from "@tanstack/react-query";
import { useQueryCategory } from "query/categoruQuery";

// Styled Component
const Header = styled.SafeAreaView`
  background-color: #0f0f10;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: ${(Platform.OS == "ios" ? Constants.statusBarHeight : 5) + 45}px;
`;

const HeaderButtons = styled.View`
  z-index: 1;

  position: absolute;
  top: ${() => (Platform.OS == "android" ? "12px" : Constants.statusBarHeight + 15 + "px")};
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  width: 50px;
  padding-left: ${(props) => props.theme.spacing.md};
`;

const SongListWrapper = styled.View`
  width: 100%;
  /* flex-direction: row; */
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SongTileWrapper = styled.View`
  width: 50%;
  /* flex-direction: row; */
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ListImage = styled.Image`
  width: 51px;
  height: 30px;
  border-radius: ${(props) => props.theme.borderRadius.md};
`;

export default function SongList({ route, navigation }) {
  const { title = "Explore", type, id, songs = [] } = route.params;
  const { theme } = useTheme();
  const [activePage, setActivePage] = useState(1);
  const [songsData, setSongsData] = useState([]);

  const { data, isLoading } = useQueryPagedCategorySongs(type === "category", id, activePage);

  // });
  useEffect(() => {
    if (data) {
      setSongsData([...songsData, ...data?.songs]);
    }
  }, [data]);

  console.log("page ", activePage, data);
  const { data: category_data, isLoading: categorie_loading } = useQueryCategory();
  return (
    <>
      <HeaderButtons>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
            setActivePage(1);
          }}
        >
          <Entypo name="chevron-left" size={20} color={theme.color.primary} />
        </TouchableOpacity>
      </HeaderButtons>
      <Header>
        <Label>{title}</Label>
        <SongListFilter />
      </Header>
      <Canvas>
        {/* <ScrollView style={{ flex: 1, paddingTop: 10 }} showsVerticalScrollIndicator={false}> */}
        <Container style={{ flex: 1 }}>
          <SongListWrapper style={{ marginTop: 20 }}>
            <FlatList
              columnWrapperStyle={{ justifyContent: "space-between" }}
              showsHorizontalScrollIndicator={false}
              // horizontal
              numColumns={2}
              data={songsData}
              // data={songs}
              keyExtractor={(item) => item._id}
              renderItem={({ item, index }) => (
                <SongTileWrapper>
                  <SongTile
                    allCategories={category_data?.categories}
                    style={{ marginBottom: 20 }}
                    inGrid
                    song={item}
                    queue={item}
                  />
                </SongTileWrapper>
              )}
              onEndReachedThreshold={0.2}
              onEndReached={() => setActivePage(data?.nextPage)}
            />
            {/* {data?.songs.map((song) => (
              <SongTile style={{ marginBottom: 20 }} inGrid song={song} queue={songs} />
            ))} */}
          </SongListWrapper>
        </Container>
        <NavigationPadding />
        {/* </ScrollView> */}
      </Canvas>
    </>
  );
}

const Label = styled(Text)`
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
`;
