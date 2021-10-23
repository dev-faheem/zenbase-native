import React from 'react';
import { Text } from "components";
import styled from 'styled-components/native';

// Import Images
import closeImage from 'assets/images/close.png';

// Styled Components
const AlertWrapper = styled.View`
    width: 100%;
    margin-top: ${props => props.theme.spacing.xxl}
    padding: ${props => props.theme.spacing.lg};
    background-color: ${props => props.theme.color.hud};
    border-radius: ${props => props.theme.borderRadius.lg}
`;

const AlertHeader = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
`

const CloseButton = styled.Image`
    height: 12px; 
    width: 12px;
`

const AlertBody = styled.View`
    margin-top: ${props => props.theme.spacing.md};
`


export default function Alert({ title, body }) {
    return <AlertWrapper>
        <AlertHeader>
            <Text fontSize="lg" fontWeight="bold">{title}</Text>
            <CloseButton source={closeImage} />
        </AlertHeader>
        <AlertBody>
            <Text color='secondary'>{body}</Text>
        </AlertBody>
    </AlertWrapper>
}