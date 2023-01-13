import Text from "components/text";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

export default function BellCard(props) {
  const { title, icon, width, height } = props;
  return (
    <Wrapper width={Dimensions.get("window").width * 0.5}>
      <ContnetWrapper>
        <IconWrapper>
          <BellIcon source={icon} width={width} height={height} />
        </IconWrapper>
        <TitleWrapper>
          <Title>{title}</Title>
        </TitleWrapper>
      </ContnetWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  width: ${({ width }) => width};
  /* background: red; */
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const ContnetWrapper = styled.TouchableOpacity``;
const TitleWrapper = styled.View``;

const Title = styled(Text)`
  width: 100%;
  text-align: center;
`;

const IconWrapper = styled.View`
  height: 80px;
  width: 150px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme: { getSize } }) => getSize(7)}px;
`;

const BellIcon = styled.Image`
  width: ${({ width, theme: { getSize } }) => getSize(width)}px;
  height: ${({ height, theme: { getSize } }) => getSize(height)}px;
`;
