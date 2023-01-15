import Text from "components/text";
import styled from "styled-components/native";
import { useTheme } from "stores/theme";
import lineIcon from "assets/images/timerIcons/timer-inp-link.png";

export default function IntervalBell(props) {
  const { selsctedSound = "" } = props;
  const { theme } = useTheme();
  return (
    <Wrapper>
      <ContentWrapper>
        <Head>
          <Title>Interval Bell</Title>
          <NromalText>Silent</NromalText>
        </Head>
        <InpHandlerWrapper>
          <LinkeIcon source={lineIcon} />
        </InpHandlerWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.View`
 display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  background:${({ theme: { color } }) => color?.card};
  border-radius: ${({ theme: { getSize } }) => getSize(15)}px;
  height: ${({ theme: { getSize } }) => getSize(102)}px;
  padding: ${({ theme: { getSize } }) => `0 ${getSize(36)}px 0 ${getSize(19.5)}px`}};
  margin-bottom: ${({ theme: { getSize } }) => getSize(40)}px;
`;
const ContentWrapper = styled.View`
  display: block;
  width: 100%;
  flex-grow: 1;
  flex-direction: column;
`;
const Head = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const Title = styled(Text)`
  font-weight: 600;
  font-size: ${({ theme: { getSize } }) => getSize(20)}px;
  line-height: ${({ theme: { getSize } }) => getSize(19)}px;
`;

const NromalText = styled(Text)`
  font-size: ${({ theme: { getSize } }) => getSize(16)}px;
  line-height: ${({ theme: { getSize } }) => getSize(19.09)}px;
`;

const InpHandlerWrapper = styled.View`
  width: 100%;
  padding-left: ${({ theme: { getSize } }) => getSize(9.5)}px;
`;
const LinkeIcon = styled.Image`
  width: ${({ theme: { getSize } }) => getSize(11)}px;
  height: ${({ theme: { getSize } }) => getSize(27)}px;
`;
