import { useState } from "react";
import styled from "styled-components/native";
import { Text } from "components";
import { FlatList } from "react-native";

export default function ActivitiesTabs(props) {
  const { title = "", tabContent = [] } = props;
  const [activeTab, setActiveTab] = useState(tabContent[0]?.id);

  const renderTabButtons = () => (
    <TabButtonWrapper>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={tabContent}
        horizontal
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => {
          const { id, name, icon = {} } = item;
          return (
            <TabButton active={id === activeTab} onPress={() => setActiveTab(id)}>
              {icon && <Icon {...icon} />}
              <Text>{name}</Text>
            </TabButton>
          );
        }}
      />
    </TabButtonWrapper>
  );

  const currentTab = tabContent?.filter(({ id }) => id === activeTab)[0];

  return (
    <Wrapper>
      {title && <Title>{title}</Title>}
      {renderTabButtons()}
      {currentTab && currentTab?.component}
      {/* {activeTab} */}
    </Wrapper>
  );
}
const Icon = styled.Image`
  width: ${({ width }) => width};
  height: ${({ height = "16px" }) => height};
  margin-right: 9px;
`;

const Wrapper = styled.View``;
const Title = styled(Text)`
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  margin-bottom: 14px;
`;
const TabButtonWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const TabButton = styled.TouchableOpacity`
  background: #333333;
  border-radius: 10px;
  height: 50px;
  padding: 0 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  margin-right: 10px;
  ${({ active }) => (active ? `border: 1.5px solid #8D8D92;` : "")}
`;
