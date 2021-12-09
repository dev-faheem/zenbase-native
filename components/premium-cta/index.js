import React from "react";
import Text from "components/text";
import Box from "components/box";
import styled from 'styled-components/native';

// Import Images
import CTABackground from 'assets/images/cta/bg.png';
import PremiumCTAImage from 'assets/images/cta/premium.png';
import PremiumCTAFooterImage from 'assets/images/cta/premium-footer-bg.png';

// Styled Component
const CTAWrapper = styled.ImageBackground`
    flex: 1;
    overflow: hidden;
    border-radius: ${props => props.theme.borderRadius.lg};
    width: 100%;
    margin-top: ${props => props.theme.spacing.md};
    margin-bottom: ${props => props.theme.spacing.md};
    justify-content: flex-start;
    flex-direction: column;
`

const PaddingWrapper = styled.View`
    flex: 1;
    padding: ${props => props.theme.spacing.md};
` 

const CTAImageWrapper = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: center;
`

const CTAImage = styled.Image`
    width: 92%;
    height: 100%;
    border-color: #ffffff;
`

const FooterWrapper = styled.ImageBackground`
    height: 61px;
    width: 100%;
    overflow: hidden;
    border-bottom-left-radius: ${props => props.theme.borderRadius.lg};
    border-bottom-right-radius: ${props => props.theme.borderRadius.lg};
`

export default function PremiumCTA({ navigation }) {

    return <CTAWrapper source={CTABackground}>
        <PaddingWrapper>
            <Text fontSize='md' style={{ marginBottom: 6}}>USER</Text>
            <Text fontSize='20' fontWeight='600'>“Zenbase Premium has changed my life and my portfolio.”</Text>
            <CTAImageWrapper >
                <CTAImage source={PremiumCTAImage} resizeMode='contain' />
            </CTAImageWrapper>

        </PaddingWrapper>
        <FooterWrapper source={PremiumCTAFooterImage}>
            
        </FooterWrapper>
    </CTAWrapper>
}
