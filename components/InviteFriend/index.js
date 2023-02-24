import styled from "styled-components/native";
import { Text } from "components";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { useTheme } from "stores/theme";
import inviteIcon from "assets/icons/invite.png";

export default function InviteFriend(props) {
  const { label = "", onPress = () => {} } = props;
  const { theme } = useTheme();

  return (
    <Wrapper
    // onPress={onPress}
    >
      <Icon source={inviteIcon} />
      <View>
        <Info>Invite or join friends</Info>
        <CoinWrapper>
          <Invites>{label} With Friends</Invites>

          {/* <Ionicons
            name="ios-chevron-forward"
            style={{ marginTop: 1, marginLeft: -5 }}
            size={18}
            color={theme.color.information}
          /> */}
        </CoinWrapper>
      </View>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;
const Icon = styled.Image`
  width: 40px;
  height: 40px;
  margin-right: 13px;
`;
const Info = styled(Text)`
  font-size: 14px;
  color: ${({ theme }) => theme?.color?.description};
`;

const CoinWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Invites = styled(Text)`
  font-weight: 600;
  font-size: 24px;
  margin-right: 9px;
`;
