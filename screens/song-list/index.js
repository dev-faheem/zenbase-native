// Import Dependencies
import React, { useState, useEffect } from "react";
import { Platform, TouchableOpacity, FlatList } from "react-native";
import { Text, Container, Canvas, SongTile, NavigationPadding } from "components";
import styled from "styled-components/native";
import Constants from "expo-constants";
import { Entypo } from "@expo/vector-icons";

// Import Images
import { useTheme } from "stores/theme";
import SongListFilter from "./SongListFilter";
import { useInfiniteSearch, useSearch } from "query/songs";
import { useQueryCategory } from "query/category";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

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
  /**
   * title: Explore
   * type: category | section | timer
   * query
   */
  const { title = "Explore", type, query } = route.params;
  const { data: categoryData } = useQueryCategory();
  const { theme } = useTheme();
  const { data, hasNextPage, fetchNextPage } = useInfiniteSearch(type, { query });

  const songs = data?.pages?.reduce((accumulator, page) => {
    let pageSongs = [];
    if (page && page.results && page.results.length > 0) {
      pageSongs = page.results;
    }
    if (page && page.songs && page.songs.length > 0) {
      pageSongs = page.songs;
    }
    return [...accumulator, ...pageSongs];
  }, []);

  const onEndReached = () => {
    if (hasNextPage) fetchNextPage();
  };

  return (
    <>
      <HeaderButtons>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
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
              numColumns={2}
              data={songs || []}
              keyExtractor={(item, index) => index + "_" + item._id}
              renderItem={({ item }) => (
                <SongTileWrapper>
                  <SongTile
                    allCategories={categoryData?.categories}
                    style={{ marginBottom: 20 }}
                    inGrid
                    song={item}
                    queue={item}
                  />
                </SongTileWrapper>
              )}
              onEndReachedThreshold={0.5}
              onEndReached={onEndReached}
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
