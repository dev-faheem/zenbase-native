import React from "react";
import { Text, Container, Canvas } from "components";
import styled from 'styled-components/native';

// Import Images
import zentBackground from 'assets/images/wallet/zent-bg.png';
import zentLogo from 'assets/images/zentoken-Logo.png';

// Styled Components
const ZentWrapper = styled.ImageBackground`
  overflow: hidden;
  border-radius: 10px;
  width: 100%;
  height: 250px;
  margin-top: 10px;
  flex: 1;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

const ZentLogo = styled.Image`
  width: 100px;
  height: 100px;
`

const ZentTokens = styled.Text`
  font-size: 36px;
  color: rgba(247, 248, 250, 0.6);
  font-weight: bold;
  margin-top: 10px;
`

const ZentValue = styled.Text`
  font-size: 18px;
  color: rgba(247, 248, 250, 0.6);
`

function ZentCoin() {
  return <ZentWrapper source={zentBackground}>
    <ZentLogo source={zentLogo} />
    <ZentTokens>0.01 ZENT</ZentTokens>
    <ZentValue>0 USD</ZentValue>
  </ZentWrapper>
}

export default function Wallet() {
  return (
    <Canvas>
      <Container center screen>
        <ZentCoin></ZentCoin>
      </Container>
    </Canvas>
  );
}
