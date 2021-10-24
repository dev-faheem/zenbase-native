import React from "react";
import { ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
      <SafeAreaView style={expandBoundsStyle}>
        <StatusBar barStyle="light-content" />
        {children}
      </SafeAreaView>
    </BackdropView>
  );
}
