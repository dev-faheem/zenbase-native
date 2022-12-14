// import Box from "components/box";
import { FlatList, Animated, Dimensions } from "react-native";
import styled from "styled-components/native";
import chillIcon from "assets/images/categories/chill.png";
import deStressIcon from "assets/images/categories/de-stress.png";
import feelGoodIcon from "assets/images/categories/feel-good.png";
import focusIcon from "assets/images/categories/focus.png";
import guidedMeditationIcon from "assets/images/categories/guided-meditation.png";
import meditationIcon from "assets/images/categories/meditation.png";
import overwhelmedIcon from "assets/images/categories/overwhelmed.png";
import sleepIcon from "assets/images/categories/sleep.png";
import teenagersIcon from "assets/images/categories/teenagers.png";
import Box from "components/box";

export default function Categories({ isMedication = false }) {
  const meditationCategories = [
    { image: guidedMeditationIcon },
    { image: meditationIcon },
    { image: sleepIcon },
    { image: deStressIcon },
    { image: feelGoodIcon },
    { image: focusIcon },
    { image: overwhelmedIcon },
    { image: teenagersIcon },
    { image: chillIcon },
  ];

  const podCastsData = [
    { image: sleepIcon },
    { image: deStressIcon },
    { image: guidedMeditationIcon },
    { image: chillIcon },
    { image: meditationIcon },
    { image: overwhelmedIcon },
    { image: feelGoodIcon },
    { image: focusIcon },
    { image: teenagersIcon },
  ];

  const categoriesData = isMedication ? meditationCategories : podCastsData;

  return (
    <Wrapper>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={categoriesData}
        horizontal
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => {
          return (
            <Box mr={index === categoriesData?.length - 1 ? 0 : "10px"}>
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

const Item = styled.TouchableOpacity``;

const ShortcutImage = styled.Image`
  width: 182px;
  height: 114px;
`;
