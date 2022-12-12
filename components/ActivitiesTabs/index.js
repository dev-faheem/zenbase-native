import { useState } from "react";
import styled from "styled-components/native";
import { Text } from "components";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { useTheme } from "stores/theme";

export default function ActivitiesTabs(props) {
  const { title = "", tabContent = [] } = props;
  const [activeTab, setActiveTab] = useState(tabContent[0]?.id);

  const renderTabButtons = () => (
    <TabButtonWrapper>
      {tabContent?.map(({ id, name }) => (
        <TabButton active={id === activeTab} onPress={() => setActiveTab(id)}>
          <Text>{name}</Text>
        </TabButton>
      ))}
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
