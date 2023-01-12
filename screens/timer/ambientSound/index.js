import Text from "components/text";
import styled from "styled-components/native";
import { Entypo } from "@expo/vector-icons";
import { useTheme } from "stores/theme";

export default function AmbientSound(props) {
  const { selsctedSound = "" } = props;
  const { theme } = useTheme();
  return (
    <Wrapper>
      <Title>Ambient Sound</Title>
      <SelectedWrapper>
        <SelectedSound>{selsctedSound || "None"}</SelectedSound>
        <Entypo name="chevron-right" size={20} color={theme.color.information} />
      </SelectedWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.TouchableOpacity`
  width: 100%;
  background: #1e1f20;
  border-radius: ${({ theme: { getSize } }) => getSize(15)}px;
  height: ${({ theme: { getSize } }) => getSize(64)}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme: { getSize } }) => `0 ${getSize(25 - 7)}px 0 ${getSize(20.5)}px`}};
  margin-bottom: ${({ theme: { getSize } }) => getSize(40)}px;
`;
const Title = styled(Text)`
  font-size: ${({ theme: { getSize } }) => getSize(20)}px;
  line-height: ${({ theme: { getSize } }) => getSize(19)}px;
`;

const SelectedWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;
const SelectedSound = styled(Text)``;
