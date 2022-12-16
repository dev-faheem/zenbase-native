// import Box from "components/box";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import Box from "components/box";

export default function Categories({ categories }) {
  return (
    <Wrapper>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={categories}
        horizontal
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => {
          return (
            <Box mr={index === categories?.length - 1 ? 0 : "10px"}>
              <Item onPress={() => console.log(`Category: ${item?.name}`)}>
                <ShortcutImage
                  source={{ uri: "https://opt.moovweb.net?quality=30&img=" + item?.artwork }}
                />
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
