import styled from "styled-components/native";
import { Text } from "components";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { useTheme } from "stores/theme";
import friendsIcon from "assets/icons/friends.png";
import { useNavigation } from "@react-navigation/native";

export default function EarnMore() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  return (
    <Wrapper onPress={() => navigation.navigate("Wallet")}>
      <Icon source={friendsIcon} />
      <View>
        <CoinWrapper>
          <Label>Earn 10% more ZENT together on any sound</Label>
        </CoinWrapper>
      </View>
    </Wrapper>
  );
}

const Wrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;
const Icon = styled.Image`
  width: 115.52px;
  height: 130px;
  margin-right: 13px;
`;

const CoinWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Label = styled(Text)`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  width: 210px;
`;
