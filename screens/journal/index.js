import React, { useState } from "react";
import { Container, Canvas, Text, Header, AnimatedHeaderView } from "components";
import { ScrollView, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { useTheme } from "stores/theme";
import { SwipeListView } from "react-native-swipe-list-view";
import styled from "styled-components/native";
import { useAuth } from "stores/auth";
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import axios from "services/axios";

// Import Images
import SongImage from "assets/images/song.png";
import ZenbaseVectorGrey from "assets/vectors/zenbase-grey.png";
import pinIcon from "assets/icons/pin.png";
import unpinIcon from "assets/icons/unpin.png";

// Import Icons
import { Ionicons } from "@expo/vector-icons";

const JournalList = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  padding-top: 8px;
  padding-left: 12px;
  padding-right: 20px;
  background-color: ${(props) => props.theme.color.background};
`;

const JournalListContent = styled.View`
  height: 89px;
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-left: 8px;
  padding-bottom: 5px;
`;

const JournalListImg = styled.Image`
  width: 90px;
  height: 89px;
  border-radius: 10px;
  margin-left: 8px;
  margin-right: 8px;
`;

const JournalListImgLoading = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  margin-left: 8px;
  margin-right: 8px;
  background: #8b57ff;
`;

const JournalDeleteWrapper = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 8px;
`;

const JournalPinButton = styled.TouchableOpacity`
  width: 89px;
  height: 89px;
  background-color: ${(props) => props.theme.color.primary};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  border-radius: 10px;
`;

const PinImage = styled.Image`
  width: 16px;
  height: 16px;
`;

const JournalDeleteButton = styled.TouchableOpacity`
  width: 89px;
  background-color: red;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  border-radius: 10px;
`;

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Journal Component (Default)
export default function Journal({ route, navigation }) {
  // Theme Configuration
  const { theme } = useTheme();
  const { user, updateUser } = useAuth();
  const isFocused = useIsFocused();
  const [journals, setJournals] = useState(
    user.journal.map((item) => {
      const createdAt = new Date(item.created);
      return {
        //id: 1,
        title: item.title,
        date: `${months[createdAt.getMonth()]} ${createdAt.getDate()}`,
        description: item.description,
        type: item.emotion,
        zentValue: item.zentValue,
        item,
      };
    })
  );

  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const updatedSongIds = journals.map((entry) => {
      return entry.item.song;
    });
    if (updatedSongIds.length > 0) {
      fetchSongs(updatedSongIds);
    }
  }, [journals]);

  const fetchSongs = async (ids) => {
    const response = await axios.get("/songs/ids?ids=" + ids.join(","));
    setSongs(response.data.data.results);
  };

  // Function to delete Journal
  const deleteJournal = (journal, journalIndex) => {
    // Delete Logic...
    user.journal.splice(journalIndex, 1);
    updateUser("journal", [...user.journal]);

    // Remove Journal from the `journals` list
    journals.splice(journalIndex, 1);
    setJournals([...journals]);
  };

  return (
    <>
      <AnimatedHeaderView header={<Header previousScreenName={"Profile"} />} inputRange={[10, 50]}>
        <Canvas>
          <ScrollView style={{ width: "100%" }} showsVerticalScrollIndicator={false}>
            <Header previousScreenName={"Profile"} />
            <Container>
              <Text fontSize="h2" fontWeight="bold" style={{ marginBottom: 18 }}>
                My Journal
              </Text>
              {false && !user.isPremium && (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("JournalUpgradeToZenbase");
                  }}
                  style={{ marginBottom: 20 }}
                >
                  <JournalList
                    style={{ borderRadius: 10, paddingBottom: 3, backgroundColor: theme.color.hud }}
                  >
                    <JournalListImg source={ZenbaseVectorGrey} resizeMode="cover" />
                    <JournalListContent style={{ borderBottomWidth: 0 }}>
                      <View style={{ width: "88%" }}>
                        <Text style={{ marginTop: 6, lineHeight: 18 }} fontSize="13">
                          Save all of your journal entries with Zenbase Premium and earn more.
                        </Text>
                      </View>
                      <View
                        style={{
                          width: "5%",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Ionicons
                          name="ios-chevron-forward"
                          size={20}
                          color={theme.color.information}
                        />
                      </View>
                    </JournalListContent>
                  </JournalList>
                </TouchableOpacity>
              )}
            </Container>

            {journals.length > 0 && (
              <SwipeListView
                closeOnRowOpen={true}
                data={journals}
                renderItem={(data, rowMap) => {
                  const song = songs.find((x) => {
                    return x._id == data.item.item.song;
                  });

                  return (
                    <TouchableHighlight onPress={() => {}}>
                      <JournalList>
                        {song ? (
                          <JournalListImg source={{ uri: song?.artwork }} resizeMode="cover" />
                        ) : (
                          <JournalListImgLoading />
                        )}
                        <JournalListContent
                          style={
                            data.index == journals.length - 1 ? { borderBottomWidth: 0 } : null
                          }
                        >
                          <View style={{ width: "100%" }}>
                            <Text numberOfLines={1} color="primary" fontWeight="600">
                              {data.item.date} • {Number(data.item.zentValue).toFixed(3) || "0"}{" "}
                              ZENT
                            </Text>
                            <Text
                              numberOfLines={1}
                              style={{
                                marginTop: 8,
                                textTransform: "capitalize",
                              }}
                              fontSize="16"
                              fontWeight="500"
                            >
                              {data.item.title || data.item.type}
                            </Text>
                            <Text color="description" numberOfLines={1} fontSize="16">
                              {data.item.description}
                            </Text>
                          </View>
                        </JournalListContent>
                      </JournalList>
                    </TouchableHighlight>
                  );
                }}
                renderHiddenItem={(data, rowMap) => {
                  return (
                    <JournalDeleteWrapper>
                      <JournalPinButton>
                        <PinImage source={pinIcon} resizeMode="contain" />
                      </JournalPinButton>
                      <JournalDeleteButton
                        onPress={() => {
                          rowMap[data.index].closeRow();
                          navigation.navigate("DeleteJournal", {
                            journal: data.item,
                            index: data.index,
                            deleteFunction: deleteJournal,
                          });
                        }}
                      >
                        <Ionicons name="trash" size={24} color={theme.color.white} />
                      </JournalDeleteButton>
                    </JournalDeleteWrapper>
                  );
                }}
                keyExtractor={(data, index) => {
                  return `${index}`;
                }}
                leftOpenValue={109}
                stopLeftwipe={120}
                rightOpenValue={-109}
                stopRightSwipe={-120}
                style={{ marginBottom: 18 }}
              />
            )}
          </ScrollView>
        </Canvas>
      </AnimatedHeaderView>
    </>
  );
}
