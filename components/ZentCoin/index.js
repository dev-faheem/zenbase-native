import styled from "styled-components/native";
import { Text } from "components";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { useTheme } from "stores/theme";
import zentLogo from "assets/logos/zent-coin.png";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ZentCoin(props) {
  const {} = props;
  const { theme } = useTheme();
  const navigation = useNavigation();

  const info = "Earn 30% more with Zenbase Premium";
  const coins = "0.02 ZENT";
  // const time = "16:07:05";
  const time = "";

  return (
    <Wrapper onPress={() => navigation.navigate("Wallet")}>
      <ZentIcon source={zentLogo} />
      <View>
        <Info>{info}</Info>
        <CoinWrapper>
          <Coins>{coins}</Coins>
          {time && <Time>{time}</Time>}
          <Entypo name="chevron-right" size={20} color={theme.color.information} />
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
const ZentIcon = styled.Image`
  width: 36.56px;
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

const CoinsText = styled(Text)`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  margin-right: 9px;
`;

const Coins = styled(CoinsText)``;

const Time = styled(CoinsText)`
  color: ${({ theme }) => theme?.color?.green};
`;
