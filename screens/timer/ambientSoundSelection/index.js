import React, { useState, useRef } from "react";
import { Text, AnimatedHeaderView } from "components";

import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/core";
import Canvas from "components/canvas";
import SoundCard from "./soundCard";
import { Dimensions, FlatList, TouchableOpacity } from "react-native";
import tempSongTile from "assets/images/song.png";
import { Container, Box } from "components";
import Header from "./header";

export default function AmbientSoundSelection(props) {
  const { width } = Dimensions.get("window");

  const soundListData = [
    { _id: 1, title: "Birds", songImage: tempSongTile },
    { _id: 2, title: "Ocean Waves", songImage: tempSongTile },
    { _id: 3, title: "Birds", songImage: tempSongTile },
    { _id: 4, title: "Ocean Waves", songImage: tempSongTile },
    { _id: 5, title: "Birds", songImage: tempSongTile },
    { _id: 6, title: "Ocean Waves", songImage: tempSongTile },
    { _id: 7, title: "Birds", songImage: tempSongTile },
    { _id: 8, title: "Ocean Waves", songImage: tempSongTile },
  ];

  const cardWidth = width / 2 - 28;

  return (
    <>
      <AnimatedHeaderView
        previousScreenName="Timer"
        header={<Header previousScreenName="Timer" title={"Ambient Sound"} />}
        inputRange={[10, 50]}
      >
        <Header previousScreenName="Timer" inputRange={[10, 50]} />
        <Container style={{ flex: 1, position: "relative", zIndex: 2 }}>
          <Title>Ambient Sound</Title>
          <Wrapper>
            <FlatList
              columnWrapperStyle={{ justifyContent: "space-between" }}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={soundListData || []}
              keyExtractor={(item, index) => index + "_" + item._id}
              renderItem={({ item, index }) => (
                <Box pl={20} mr={index === soundListData?.length - 1 ? "10px" : "10px"}>
                  <CardWrapper width={cardWidth}>
                    <SoundCard {...item} cardWidth={cardWidth} />
                  </CardWrapper>
                </Box>
              )}
              onEndReachedThreshold={0.5}
              // onEndReached={onEndReached}
            />
          </Wrapper>
        </Container>
      </AnimatedHeaderView>
    </>
  );
}

const Wrapper = styled.View``;
const CardWrapper = styled.View`
  width: ${({ width }) => width}px;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const Title = styled(Text)`
  font-weight: 700;
  font-size: ${({ theme: { getSize } }) => getSize(32)}px;
  line-height: ${({ theme: { getSize } }) => getSize(38)}px;
  margin-bottom: ${({ theme: { getSize } }) => getSize(17)}px;
`;
