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
import { FlatList, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import useCategories from "queries/useCategories";

import { Feather, Ionicons } from "@expo/vector-icons";
import { useTheme } from "stores/theme";


// Import Images
import SongImg from 'assets/images/song.png';
import ArtistImg from 'assets/images/artist.png';


// Styled Components
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

const SongListWrapper = styled.View`
  width: ${Dimensions.get('window').width * 0.89}px;
  padding-top: ${props => props.theme.spacing.md};
  padding-bottom: ${props => props.theme.spacing.md};
`

const SongList = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

const SongImage = styled.Image`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 5px;
`;

const ArtistImage = styled.Image`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 50px;
`;

const SongContentWrapper = styled.View`
  height: 48px;
  width: 83%;
  flex-direction: row;
  justify-content: space-between;
  border-top-color: rgba(172, 178, 155, 0.5);
  border-top-width: 0px;
  
  border-bottom-color: rgba(172, 178, 155, 0.5);
  border-bottom-width: 0.5px;
`

const SongContent = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding-left: ${props => props.theme.spacing.sm};
`

const IconWrapper = styled.View`
  height: 100%;
  flex-direction: column;
  justify-content: center;
`

export default function Search() {

  const { theme } = useTheme();

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


          <Text fontSize="sm" color="secondary" style={{ marginTop: 5, marginBottom: 5 }}>
            RECENT
          </Text>

          <ScrollView
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            style={{ width: '100%' }}
            horizontal={true}>
            <SongListWrapper >

              <SongList onPress={() => { }}>
                <SongImage source={SongImg} />
                <SongContentWrapper style={{ borderTopWidth: 0.5 }}>

                  <SongContent>
                    <Text>Prime Time</Text>
                    <Text fontSize='sm' color="secondary">Song • Aware</Text>
                  </SongContent>

                  <IconWrapper>
                    <TouchableOpacity onPress={() => {}}>
                      <Feather name="more-horizontal" size={24} color={theme.color.white} />
                    </TouchableOpacity>
                  </IconWrapper>
                </SongContentWrapper>
              </SongList>

              <SongList onPress={() => { }}>
                <ArtistImage source={ArtistImg} />
                <SongContentWrapper>
                  <SongContent>
                    <Text>Karunesh</Text>
                    <Text fontSize='sm' color="secondary">Artist</Text>
                  </SongContent>

                  <IconWrapper>
                    <TouchableOpacity onPress={() => {}}>
                      <Ionicons name="ios-chevron-forward" size={24} color={theme.color.white} />
                    </TouchableOpacity>
                  </IconWrapper>
                </SongContentWrapper>
              </SongList>
              

            </SongListWrapper>

            {/* Last Wrapper */}
            <SongListWrapper >

              <SongList>
                <SongImage source={SongImg} />

                {/* set width to 88% if it is last list wrapper */}
                <SongContentWrapper style={{ borderTopWidth: 0.5, width: '85%'}}>
                  <SongContent>
                    <Text>Prime Time</Text>
                    <Text fontSize='sm' color="secondary">Song • Aware</Text>
                  </SongContent>

                  <IconWrapper>
                    <Feather name="more-horizontal" size={24} color={theme.color.white} />
                  </IconWrapper>
                </SongContentWrapper>
              </SongList>
              

            </SongListWrapper>
          </ScrollView>

          {searchQuery?.data?.results?.length > 0 && (
            <Text fontSize="xs" color="secondary">
              RECENT
            </Text>
          )}

          {/* <SongListing song={item} index={index} />; */}

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
