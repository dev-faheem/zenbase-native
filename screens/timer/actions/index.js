import Text from "components/text";
import styled from "styled-components/native";

export default function Actions(props) {
  return (
    <Wrapper>
      <Title>Cancel</Title>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  background: #1e1f20;
`;
const Title = styled(Text)``;
