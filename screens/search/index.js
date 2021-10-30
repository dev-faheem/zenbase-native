import React, { useEffect, useState } from "react";
import {
  Text,
  Container,
  Canvas,
  CategoryGrid,
  SongListing,
  Box,
} from "components";
import styled from "styled-components/native";
import useSearch from "queries/useSearch";
import { FlatList, ScrollView } from "react-native";
import useCategories from "queries/useCategories";

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
  const categoriesQuery = useCategories();

  useEffect(() => {
    if (search?.trim() !== "") searchQuery.mutate({ search });
  }, [search]);

  return (
    <Canvas>
      <ScrollView>
        <Container>
          <Box mt="20px"></Box>
          <Text fontSize="h2" fontWeight="bold">
            Search
          </Text>
          <SearchInput
            placeholder="Artists, Sounds, Friends, and More"
            placeholderTextColor="rgba(143, 144, 148, 1)"
            value={search}
            onChangeText={(value) => setSearch(value)}
          />

          {searchQuery?.data?.results?.length > 0 && (
            <Text fontSize="xs" color="secondary">
              RECENT
            </Text>
          )}

          <FlatList
            data={searchQuery?.data?.results}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) => {
              return <SongListing song={item} index={index} />;
            }}
            style={{ width: "100%" }}
          />

          <CategoryGrid categories={categoriesQuery.data} />
        </Container>
      </ScrollView>
    </Canvas>
  );
}
