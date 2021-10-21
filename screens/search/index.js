import React from "react";
import { Text, Container, Canvas } from "components";
import styled from "styled-components/native";

const SearchInput = styled.TextInput`
  background-color: rgba(27, 28, 30, 0.9);
  color: rgba(143, 144, 148, 1);
  width: 100%;
  border-radius: 10px;
  padding-horizontal: 8px;
  height: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export default function Search() {
  return (
    <Canvas>
      <Container>
        <Text fontSize="h2" fontWeight="bold">
          Artists, Sounds, Friends, and More
        </Text>
        <SearchInput
          placeholder="Search"
          placeholderTextColor="rgba(143, 144, 148, 1)"
        />
      </Container>
    </Canvas>
  );
}
