import styled from "styled-components/native";

const Container = styled.View`
  padding-left: ${(props) => props.theme.spacing.xxl};
  padding-right: ${(props) => props.theme.spacing.xxl};
  justify-content: ${(props) => (props.center ? "center" : "flex-start")};
  align-items: ${(props) => (props.center ? "center" : "flex-start")};
  height: ${(props) => (props.screen ? "100%" : "auto")};
`;

export default Container;
