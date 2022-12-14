// import Box from "components/box";
import { FlatList } from "react-native";
import { Text } from "components";
import styled from "styled-components/native";
import groundingIcon from "assets/images/shortcuts/grounding.png";
import timerIcon from "assets/images/shortcuts/timer.png";
import visualizationIcon from "assets/images/shortcuts/visualization.png";
import Box from "components/box";

export default function BrowseByTime() {
  const shortcutsData = [
    { image: timerIcon },
    { image: groundingIcon },
    { image: visualizationIcon },
  ];

  return (
    <Wrapper>
      <Title>Shortcuts</Title>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={shortcutsData}
        horizontal
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => {
          return (
            <Box mr={index === shortcutsData?.length - 1 ? 0 : "10px"}>
              <Item onPress={() => console.log("Click here")}>
                <ShortcutImage source={item?.image} />
              </Item>
            </Box>
          );
        }}
      />
    </Wrapper>
  );
}
const Wrapper = styled.View`
  width: 100%;
  margin-bottom: 34px;
  display: flex;
`;
const Title = styled(Text)`
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  margin-bottom: 14px;
`;

const Item = styled.TouchableOpacity``;

const ShortcutImage = styled.Image`
  width: 160px;
  height: 87.91px;
`;
