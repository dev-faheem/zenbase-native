import React from "react";
import { useMock } from "services/mock";
import styled from "styled-components/native";

const CategoryTileImage = styled.Image`
  border-radius: 5px;
  width: 180px;
  height: 112px;
`;

const CategoryTileName = styled.Text`
  color: white;
  font-size: 12px;
`;

const CategoryTileWrapper = styled.View``;

export default function CategoryTile({ category, mock, inlineTitle = false }) {
  category = useMock("category", category, mock);

  return (
    <CategoryTileWrapper>
      <CategoryTileImage source={category.image} />
      <CategoryTileName inlineTitle={inlineTitle}>
        {category.name}
      </CategoryTileName>
    </CategoryTileWrapper>
  );
}
