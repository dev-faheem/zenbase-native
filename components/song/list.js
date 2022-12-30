import React from "react";
import Box from "components/box";
import Text from "components/text";
import { FlatList, TouchableOpacity, Platform } from "react-native";
import SongTile from "components/song/tile";
import styled from "styled-components/native";
import Divider from "components/divider";
import { useNavigation } from "@react-navigation/core";
import Constants from "expo-constants";
import { useTheme } from "stores/theme";
import { Entypo } from "@expo/vector-icons";

const Wrapper = styled.View`
  width: 100%;
  margin-bottom: 55px;
`;

const TitleContainer = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  /* padding-left: 10px;
  padding-right: 10px; */
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const TitleWrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Title = styled(Text)`
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
`;

export default function SongList(props) {
  const { id, title, songs, showDivider = true, categories, ...rest } = props;
  const navigation = useNavigation();
  const { theme } = useTheme();
  // console.log("ttt ", rest);

  return (
    <Wrapper>
      {title && (
        <TitleContainer>
          <TitleWrapper
            onPress={() => {
              navigation.navigate("SongList", { type: "category", id, title });
            }}
          >
            <Title>{title}</Title>
            <Entypo name="chevron-right" size={24} color={theme.color.information} />
          </TitleWrapper>
        </TitleContainer>
      )}

      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={songs.slice(0, 5)}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <Box mr={index === songs.length - 1 ? 0 : "10px"}>
            <SongTile allCategories={categories} key={index} song={item} queue={songs} inGrid />
          </Box>
        )}
      />
    </Wrapper>
  );
}
