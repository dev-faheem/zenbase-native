import { FlatList } from "react-native";
import styled from "styled-components/native";
import Box from "components/box";
import config from "services/config";

export default function Categories({ categories, vertical = false }) {
  const flarListProps = vertical ? { numColumns: 2 } : {};

  return (
    <Wrapper>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={categories}
        horizontal={!vertical}
        keyExtractor={(item) => item._id}
        {...flarListProps}
        renderItem={({ item, index }) => {
          return (
            <Box
              ml={vertical ? "5px" : undefined}
              mr={vertical ? "5px" : index === categories?.length - 1 ? 0 : "10px"}
              mb={vertical ? "10px" : undefined}
            >
              <Item onPress={() => console.log(`Category: ${item?.name}`)}>
                <ShortcutImage source={{ uri: config.EDGE_IMAGE_PREFIX + item?.artwork }} />
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
  border-radius: 8px;
`;
