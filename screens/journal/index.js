import React, { useState } from "react";
import { Container, Canvas, Text } from "components";
import {
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "stores/theme";
import { SwipeListView } from "react-native-swipe-list-view";
import styled from "styled-components/native";

// Import Images
import SongImage from "assets/images/song.png";
import ZenbaseVectorGrey from "assets/vectors/zenbase-grey.png";

// Import Icons
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "stores/auth";
import { useIsFocused } from "@react-navigation/native";

// Styled Component
const JournalHeader = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

const JournalList = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  padding-top: ${(props) => props.theme.spacing.sm};
  padding-left: ${(props) => props.theme.spacing.md};
  background-color: ${(props) => props.theme.color.hud};
`;

const JournalListContent = styled.View`
  height: 55px;
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.color.informationBackground};
  margin-left: ${(props) => props.theme.spacing.sm};
  padding-bottom: 5px;
`;

const JournalListImg = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: ${(props) => props.theme.borderRadius.md};
  margin-left: ${(props) => props.theme.spacing.sm};
  margin-right: ${(props) => props.theme.spacing.sm};
`;

const JournalDeleteWrapper = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

const JournalDeleteButton = styled.View`
  width: 70px;
  background-color: red;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

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
        date: `${createdAt.getDate()}/${createdAt.getMonth() + 1}/${
          createdAt.getFullYear() - 2000
        }`,
        description: item.description,
        type: item.emotion,
        zentValue: item.zentValue,
        item,
      };
    })
  );

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
    <Canvas>
      <JournalHeader>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons
            name="ios-chevron-back"
            size={30}
            color={theme.color.primary}
          />
        </TouchableOpacity>
      </JournalHeader>
      <Container style={{ flex: 1 }}>
        <ScrollView
          style={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
        >
          <Text fontSize="h2" fontWeight="bold" style={{ marginBottom: 18 }}>
            My Journal
          </Text>
          {journals.length > 0 && (
            <SwipeListView
              closeOnRowOpen={true}
              data={journals}
              renderItem={(data, rowMap) => {
                let listStyle = {};

                if (data.index == 0) {
                  listStyle = {
                    ...listStyle,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  };
                }

                if (data.index == journals.length - 1) {
                  listStyle = {
                    ...listStyle,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  };
                }

                return (
                  <TouchableHighlight
                    onPress={() => {
                      navigation.navigate("DeleteJournal", {
                        journal: data.item,
                        index: data.index,
                        deleteFunction: deleteJournal,
                      });
                    }}
                  >
                    <JournalList style={listStyle}>
                      <JournalListImg source={{ uri: data.item?.image }} resizeMode="cover" />
                      <JournalListContent
                        style={
                          data.index == journals.length - 1
                            ? { borderBottomWidth: 0 }
                            : null
                        }
                      >
                        <View style={{ width: "58%" }}>
                          <Text numberOfLines={1} style={{ marginTop: 4, textTransform: 'capitalize' }} >
                            {data.item.title || data.item.type}
                          </Text>
                          <Text
                            color="information"
                            numberOfLines={1}
                            style={{ marginTop: 5 }}
                            fontSize="sm"
                          >
                            {data.item.date} {data.item.description}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: "42%",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-end",
                            paddingRight: 15
                          }}
                        >
                          <Text numberOfLines={1} color="primary">
                            {Number(data.item.zentValue).toPrecision(3) || "0"}{" "}
                            ZENT
                          </Text>
                        </View>
                      </JournalListContent>
                    </JournalList>
                  </TouchableHighlight>
                );
              }}
              renderHiddenItem={(data, rowMap) => {
                let deleteButtonStyle = {};

                if (data.index == 0) {
                  deleteButtonStyle = {
                    ...deleteButtonStyle,
                    borderTopRightRadius: 12,
                  };
                }

                if (data.index == journals.length - 1) {
                  deleteButtonStyle = {
                    ...deleteButtonStyle,
                    borderBottomRightRadius: 12,
                  };
                }

                return (
                  <JournalDeleteWrapper
                    onPress={() => {
                      rowMap[data.index].closeRow();
                      deleteJournal(data, data.index);
                    }}
                  >
                    <JournalDeleteButton style={deleteButtonStyle}>
                      <Ionicons
                        name="trash"
                        size={24}
                        color={theme.color.white}
                        style={{ marginLeft: 7 }}
                      />
                    </JournalDeleteButton>
                  </JournalDeleteWrapper>
                );
              }}
              disableRightSwipe
              keyExtractor={(data, index) => {
                return `${index}`;
              }}
              rightOpenValue={-60}
              stopRightSwipe={-62}
              style={{ marginBottom: 18 }}
            />
          )}

          {!user.isPremium && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("JournalUpgradeToZenbase");
              }}
            >
              <JournalList style={{ borderRadius: 10, paddingBottom: 3 }}>
                <JournalListImg source={ZenbaseVectorGrey} resizeMode="cover" />
                <JournalListContent style={{ borderBottomWidth: 0 }}>
                  <View style={{ width: "88%" }}>
                    <Text
                      color="information"
                      style={{ marginTop: 6, lineHeight: 18 }}
                      fontSize="13"
                    >
                      Earn and save all of your journal entries with Zenbase
                      Premium.
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "12%",
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
        </ScrollView>
      </Container>
    </Canvas>
  );
}
