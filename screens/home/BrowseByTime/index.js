// import Box from "components/box";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import Box from "components/box";
import timeIcon from "assets/icons/time-tab.png";
import { Text } from "components";

export default function Shortcuts() {
  const shortcutsData = [{ time: 5 }, { time: 10 }, { time: 15 }, { time: 20 }, { time: 25 }];

  return (
    <Wrapper>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={shortcutsData}
        horizontal
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => {
          return (
            <Box mr={index === shortcutsData?.length - 1 ? 0 : "10px"}>
              <Item onPress={() => console.log("Click here ", item?.time)}>
                <ShortcutImage source={timeIcon} />
                <TimeLabelHolder>
                  <TimeLabel>{item?.time}</TimeLabel>
                  <TimeLabelMin>MIN</TimeLabelMin>
                </TimeLabelHolder>
              </Item>
            </Box>
          );
        }}
      />
      <BottomContent>Tell us how much time you have and we’ll recommend you content.</BottomContent>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  width: 100%;
  margin-bottom: 34px;
`;
const Item = styled.TouchableOpacity`
  position: relative;
  margin-bottom: 14px;
`;
const TimeLabelHolder = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-20px, -20px);
  width: 40px;
`;
const TimeLabel = styled(Text)`
  font-weight: 600;
  font-size: 23.1818px;
  line-height: 28px;
  text-align: center;
`;
const TimeLabelMin = styled(Text)`
  font-weight: 600;
  font-size: 11.59px;
  line-height: 13.83px;
  text-align: center;
`;
const ShortcutImage = styled.Image`
  width: 85px;
  height: 85px;
`;

const BottomContent = styled(Text)`
  color: ${({ theme }) => theme?.color?.secondary};
`;
