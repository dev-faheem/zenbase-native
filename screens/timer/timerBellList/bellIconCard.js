import Text from "components/text";
import styled from "styled-components/native";

export default function BellIconCard(props) {
  const { id, title, icon, width, height } = props;

  return (
    <Wrapper>
      <IconWrapper>
        <BellIcon source={icon} width={width} height={height} />
      </IconWrapper>
      <TitleWrapper>
        <Title>{title}</Title>
      </TitleWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  margin-left: auto;
  margin-right: auto;
`;
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
