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
  padding-left: 5px;
  padding-right: 10px;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const GridRow = styled.View`
  display: flex;
  flex-direction: row;
`;

const GridItem = styled.View`
  margin-right: 10px;
  margin-bottom: 10px;
`;

const CategoryGrid = ({ categories, mock }) => {
  categories = useMock("categories", categories, mock);

  return (
    <>
      <TitleContainer>
        <Text fontSize="xl" color="white">
          Browse Vibes
        </Text>
      </TitleContainer>

      <GridRow>
        <GridItem>
          <CategoryTile inlineTitle mock />
        </GridItem>
        <GridItem>
          <CategoryTile inlineTitle mock />
        </GridItem>
      </GridRow>

      <GridRow>
        <GridItem>
          <CategoryTile inlineTitle mock />
        </GridItem>
        <GridItem>
          <CategoryTile inlineTitle mock />
        </GridItem>
      </GridRow>

      <GridRow>
        <GridItem>
          <CategoryTile inlineTitle mock />
        </GridItem>
        <GridItem>
          <CategoryTile inlineTitle mock />
        </GridItem>
      </GridRow>
    </>
  );
};

export default CategoryGrid;
