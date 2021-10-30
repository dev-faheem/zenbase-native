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
  margin-top: 5px;
  position: ${(props) => (props.inlineTitle ? "absolute" : "relative")};
  bottom: ${(props) => (props.inlineTitle ? "4px" : "0px")};
  left: ${(props) => (props.inlineTitle ? "10px" : "0px")};
`;

const CategoryTileWrapper = styled.TouchableOpacity``;

export default function CategoryTile({ category, inlineTitle = false }) {
  return (
    <CategoryTileWrapper
      onPress={() => {
        alert("Pressed Category: " + category?.name);
      }}
    >
      <CategoryTileImage source={{ uri: category?.artwork }} />
      <CategoryTileName inlineTitle={inlineTitle}>
        {category?.name}
      </CategoryTileName>
    </CategoryTileWrapper>
  );
}
