import React from "react";
import { ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native";
import styled from "styled-components/native";

const BackdropView = styled.View`
  background: ${(props) => props.theme.color.background};
`;

const expandBoundsStyle = {
  height: "100%",
  width: "100%",
};

export default function Canvas({ children }) {
  return (
    <BackdropView style={expandBoundsStyle}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={expandBoundsStyle}>{children}</SafeAreaView>
    </BackdropView>
  );
}
