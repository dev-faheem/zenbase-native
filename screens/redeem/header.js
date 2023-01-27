import { Text } from "components";
import { TouchableOpacity } from "react-native";
import { useTheme } from "stores/theme";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

export default function Header(props) {
  const { title = "" } = props;
  const { theme } = useTheme();
  const navigation = useNavigation();

  return (
    <>
      <HeaderWrapper>
        <HeaderTitle>
          <Text>{title}</Text>
        </HeaderTitle>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="ios-chevron-back" size={24} color={theme.color.primary} />
          <Text color="primary" fontSize={14} fontWeight={600}>
            Walet
          </Text>
        </TouchableOpacity>
      </HeaderWrapper>
    </>
  );
}

const HeaderWrapper = styled.View`
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const HeaderTitle = styled.View`
  width: 106%;
  height: 100%;
  position: absolute;
  top: 5px;
  left: 0px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
