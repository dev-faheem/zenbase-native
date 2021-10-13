import React from "react";
import styled from "styled-components/native";

const TextComponent = styled.Text`
  color: ${(props) =>
    props.color ? props.theme.color[props.color] || "white" : "white"};
`;

export default function Text(props) {
  return <TextComponent {...props} />;
}
