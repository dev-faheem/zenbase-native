import Text from "components/text";
import styled from "styled-components/native";

export default function BellCard(props) {
  const { title } = props;
  return (
    <Wrapper>
      <Title>{title}</Title>
    </Wrapper>
  );
}

const Wrapper = styled.View``;
const Title = styled(Text)``;
