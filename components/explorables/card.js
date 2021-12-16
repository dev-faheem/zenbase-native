import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

const CardWrapper = styled.View`
  margin-top: 20px;
  margin-bottom: 50px;
`;

const CardImage = styled.Image`
  border-radius: 5px;
  width: ${Dimensions.get('window').width * 0.82}px;
  height: 225px;
`;

const Header = styled.View``;

const OverlayWrapper = styled.View`
  position: absolute;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const Heading = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 24px;
`;
const SubHeading = styled.Text`
  color: white;
  font-size: 10px;
`;

const Description = styled.Text`
  color: white;
  font-size: 12px;
`;

export default function ExplorableCard({ name, description, image }) {
  return (
    <CardWrapper>
      <CardImage source={image} />
      <OverlayWrapper>
        <Header>
          <Heading>{name}</Heading>
          <SubHeading>LISTEN NOW • Earn 0.01 ZENT</SubHeading>
        </Header>
        <Description>{description}</Description>
      </OverlayWrapper>
    </CardWrapper>
  );
}
