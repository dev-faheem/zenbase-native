import Text from "components/text";
import styled from "styled-components/native";

export default function Actions(props) {
  // const { status = "" } = props;

  const temp = [{ status: "initial" }, { status: "onGoing" }, { status: "paused" }];

  return (
    <Wrapper>
      {temp.map(({ status }, index) => {
        const cancleDisable = index === 0;

        return (
          <ButtonHolder>
            <CancleButton>
              {!cancleDisable && <ButtonLine />}
              <ButtonText color={cancleDisable ? "rgba(143, 144, 148, 0.75)" : "#fff"}>
                Cancel
              </ButtonText>
            </CancleButton>
            <ActionButton color={status === "onGoing" ? "rgba(107, 38, 255, 0.35)" : "#003C14"}>
              <ButtonLine />
              <ButtonText color={status === "onGoing" ? "#E1D2FF" : "#00D444"}>
                {status === "initial" && "Start"}
                {status === "onGoing" && "Pause"}
                {status === "paused" && "Resume"}
              </ButtonText>
            </ActionButton>
          </ButtonHolder>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.View`
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
`;
const ButtonHolder = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Button = styled.TouchableOpacity`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  width: ${({ theme: { getSize } }) => getSize(90)}px;
  height: ${({ theme: { getSize } }) => getSize(90)}px;
`;
const ButtonLine = styled.View`
  border-radius: 100%;
  position: absloute;

  border: 3px solid ${({ theme: { color } }) => color?.background};
  top: ${({ theme: { getSize } }) => getSize(0)}px;
  left: ${({ theme: { getSize } }) => getSize(0)}px;
  width: ${({ theme: { getSize } }) => getSize(84)}px;
  height: ${({ theme: { getSize } }) => getSize(84)}px;
`;
const CancleButton = styled(Button)`
  background: #1e1f20;
`;
const ActionButton = styled(Button)`
  background: ${({ color }) => color};
`;
const ButtonText = styled(Text)`
  font-weight: 400;
  position: absolute;
  width: 100%;
  text-align: center;

  font-size: ${({ theme: { getSize } }) => getSize(19)}px;
  line-height: ${({ theme: { getSize } }) => getSize(24)}px;
  color: ${({ color }) => color};
`;
