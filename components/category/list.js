import React from "react";
import styled from "styled-components/native";
import Divider from "components/divider";
import CategoryTile from "components/category/tile";
import Text from "components/text";
import { FlatList, TouchableOpacity } from "react-native";
import { useMock } from "services/mock";
import Box from "components/box";

const TitleContainer = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const CategoryList = ({ categories, mock }) => {
  categories = useMock("categories", categories, mock);

  return (
    <>
      <TitleContainer>
        <Text fontSize="xl" color="white">
          Sounds by Vibration
        </Text>
      </TitleContainer>

      <FlatList
        data={categories}
        horizontal
        renderItem={() => {
          return (
            <Box ml="10px">
              <CategoryTile mock />
            </Box>
          );
        }}
      />

      <Divider />
    </>
  );
};
