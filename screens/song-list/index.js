// Import Dependencies
import React, { useState, useEffect } from "react";
import { Platform, TouchableOpacity, FlatList } from "react-native";
import { Text, Container, Canvas, SongTile, NavigationPadding, Box } from "components";
import styled from "styled-components/native";
import Constants from "expo-constants";
import { Entypo } from "@expo/vector-icons";
import { Dimensions } from "react-native";
// Import Images
import { useTheme } from "stores/theme";
import SongListFilter from "./SongListFilter";
import { useInfiniteSearch, useSearch } from "query/songs";
import { useQueryCategory } from "query/category";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { BlurView } from "expo-blur";

// Styled Component
const Header = styled.SafeAreaView`
  /* background-color: #0f0f10; */
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

  const timeSlots = [
    { time: "1-10", timeStart: 0, timeEnd: 600 },
    { time: "10-20", timeStart: 600, timeEnd: 20 * 60 },
    { time: "20-45", timeStart: 20 * 60, timeEnd: 45 * 60 },
    { time: "1+", label: "HR", timeStart: 60 * 60 },
  ];

  const [activeslot, setActiveSlot] = useState("");

  const timeFilterProps = { timeSlots, activeslot, setActiveSlot };

  const { title = "Explore", type, query } = route.params;
  const { data: categoryData } = useQueryCategory();
  const { theme } = useTheme();

  const activeslotIndex = timeSlots.findIndex((d) => d.time === activeslot);
  const timeQueryProps = activeslot !== "" ? { ...timeSlots[activeslotIndex] } : {};

  const { data, hasNextPage, fetchNextPage } = useInfiniteSearch(type, {
    query,
    ...timeQueryProps,
  });

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
      <HeaderWrapper intensity={150} tint="dark">
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
          <SongListFilter {...timeFilterProps} />
        </Header>
      </HeaderWrapper>
      <Canvas style={{ position: "relative", zIndex: 1 }}>
        {/* <ScrollView style={{ flex: 1, paddingTop: 10 }} showsVerticalScrollIndicator={false}> */}
        <Container style={{ flex: 1, position: "relative", zIndex: 2 }}>
          <SongListWrapper>
            <FlatList
              style={{
                paddingTop: 34 + 15,
                marginBottom: -100,

                // marginTop: -100,
                // height: Dimensions?.get("window").height - 100,
                // backgroundColor: "red",
              }}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={songs || []}
              keyExtractor={(item, index) => index + "_" + item._id}
              renderItem={({ item, index }) => (
                <SongTileWrapper>
                  <SongTile
                    allCategories={categoryData?.categories}
                    style={{ marginBottom: index === songs?.length - 1 ? 160 : 20 }}
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

const HeaderWrapper = styled(BlurView)`
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 90px;
  top: 0px;
  display: flex;
`;

const Label = styled(Text)`
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
`;
