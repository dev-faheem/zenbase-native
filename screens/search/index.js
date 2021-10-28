import React, { useEffect, useState } from "react";
import { Text, Container, Canvas, CategoryGrid } from "components";
import styled from "styled-components/native";
import useSearch from "queries/useSearch";
import { FlatList } from "react-native";
import useDebounce from "services/useDebounce";

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
  const [search, setSearch] = useState("");
  const searchQuery = useSearch();

  useEffect(() => {
    if (search?.trim() !== "") searchQuery.mutate({ search });
  }, [search]);

  return (
    <Canvas>
      <Container>
        <Text fontSize="h2" fontWeight="bold">
          Search
        </Text>
        <SearchInput
          placeholder="Artists, Sounds, Friends, and More"
          placeholderTextColor="rgba(143, 144, 148, 1)"
          value={search}
          onChangeText={(value) => setSearch(value)}
        />

        <FlatList
          data={searchQuery?.data?.results}
          renderItem={({ item, index }) => {
            return <Text>{item.name}</Text>;
          }}
        />

        <CategoryGrid mock />
      </Container>
    </Canvas>
  );
}
