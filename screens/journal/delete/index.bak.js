import React, { useState } from "react";
import { Alert, Container, Canvas, Text, Button } from "components";
import styled from "styled-components/native";
import { View } from "react-native";
import { useTheme } from "stores/theme";

// Import Icons
import { Entypo } from "@expo/vector-icons";

// Styled Component
const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.View`
  position: absolute;
  width: 100%;
  flex-direction: row-reverse;
  top: 0;
`;

const JournalType = styled.View`
  margin-top: ${(props) => props.theme.spacing.sm};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// Delete Journal Component (Default)
export default function DeleteJournal({ route, navigation }) {
  // Theme Configuration
  const { theme } = useTheme();
  const { journal, index: journalIndex, deleteFunction } = route.params;

  const deleteJournal = () => {
    // Delete Journal Logic
    deleteFunction(journal, journalIndex);
    // console.log({ journal });

    navigation.goBack();
  };

  return (
    <Canvas>
      <Header>
        <ButtonWrapper>
          <Button variant="silent" title="Cancel" onPress={() => navigation.goBack()} />
        </ButtonWrapper>

        <JournalType>
          <Entypo name={`emoji-${journal.type}`} size={36} color={theme.color.white} />
          <Text style={{ marginTop: 8 }}>October 20, 2021 at 1:54 PM</Text>
        </JournalType>
      </Header>
      <Container style={{ flex: 1 }}>
        <Text fontSize="h2" fontWeight="bold" style={{ marginTop: 8, marginBottom: 18 }}>
          {journal.title}
        </Text>
        <Text>{journal.description}</Text>
      </Container>
      <Container
        style={{
          height: 124,
          backgroundColor: theme.color.hud,
          borderTopWidth: 1.2,
          borderTopColor: theme.color.informationBackground,
          marginBottom: -40,
          paddingTop: 28,
        }}
      >
        <Button variant="danger" block title="Delete" onPress={deleteJournal} />
      </Container>
    </Canvas>
  );
}
