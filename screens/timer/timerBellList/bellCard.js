import Text from "components/text";
import styled from "styled-components/native";

export default function BellCard(props) {
  const { title, icon } = props;
  return (
    <Wrapper>
      <BellIcon source={icon} />
      <Title>{title}</Title>
    </Wrapper>
  );
}

const Wrapper = styled.View``;
const Title = styled(Text)``;

const BellIcon = styled.Image`
  width: 50px;
  height: 50px;
`;
