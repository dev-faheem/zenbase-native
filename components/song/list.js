import React from "react";
import Box from "components/box";
import Text from "components/text";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, TouchableOpacity, Platform } from "react-native";
import { useMock } from "services/mock";
import SongTile from "components/song/tile";
import styled from "styled-components/native";
import Divider from "components/divider";
import { useNavigation } from "@react-navigation/core";
import Constants from "expo-constants";
import { useTheme } from "stores/theme";

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

export default function SongList({ title, songs, mock = false, showDivider = true }) {
  const navigation = useNavigation();
  songs = useMock("songs", songs, mock);
  const { theme } = useTheme();

  return (
    <Wrapper>
      {title && (
        <TitleContainer>
          <TitleWrapper
            onPress={() => {
              navigation.navigate("SongList", { songs, title });
            }}
          >
            <Title>{title}</Title>
            <Ionicons
              name="ios-chevron-forward"
              style={{ marginTop: 1, marginLeft: 10 }}
              size={18}
              color={theme.color.information}
            />
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
            <SongTile key={index} song={item} queue={songs} inGrid />
          </Box>
        )}
      />
    </Wrapper>
  );
}
