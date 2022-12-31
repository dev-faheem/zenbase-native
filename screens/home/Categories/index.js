import { FlatList, Dimensions } from "react-native";
import styled from "styled-components/native";
import Box from "components/box";
import config from "services/config";
import { useNavigation } from "@react-navigation/native";

const WINDOW_WIDTH = Dimensions.get("window").width;
const TILE_SIZE = Math.min((WINDOW_WIDTH - 40) * 0.5 - 5, 182);

export default function Categories({ categories, inGrid = false }) {
  const navigation = useNavigation();
  const onPress = (category) => {
    navigation.navigate("SongList", {
      type: "category",
      query: category.name,
      title: category.name,
    });
  };

  return (
    <Wrapper>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={categories}
        horizontal={!inGrid}
        keyExtractor={(item) => item._id}
        {...(inGrid ? { numColumns: 2 } : {})}
        renderItem={({ item, index }) => {
          return (
            <>
              <Item onPress={() => onPress(item)}>
                <ShortcutImage
                  source={{ uri: config.EDGE_IMAGE_PREFIX + item?.artwork }}
                  inGrid={inGrid}
                />
              </Item>
              <Box ml="0px" mr={inGrid ? "10px" : index === categories?.length - 1 ? 0 : "10px"} />
            </>
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
  ${(props) => {
    if (props.inGrid) {
      const size = TILE_SIZE;
      if (size < 182) {
        return `
        width: ${size}px;
      `;
      }
    }

    return `
    width: 182px;
  `;
  }}
  background-color: red;
  height: ${(props) => (props.inGrid ? (114 / 182) * TILE_SIZE : "114")}px;
  border-radius: 8px;
  margin-bottom: 10px;
`;
