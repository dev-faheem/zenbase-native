// Import Dependencies
import React, { useState } from 'react';
import { Text } from "components";
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

// Import Images
import closeImage from 'assets/images/close.png';

// Styled Components
const AlertWrapper = styled.View`
    width: 100%;
    padding: ${props => props.theme.spacing.lg};
    background-color: ${props => props.theme.color.hud};
    border-radius: ${props => props.theme.borderRadius.lg};
`;

const AlertHeader = styled.View`
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


export default function Alert({ title, body, onClose, style }) {
    const [isAlert, setIsAlert] = useState(true);

    return isAlert && <AlertWrapper style={style}>
        <AlertHeader>
            <Text fontSize="lg" fontWeight="bold">{title}</Text>
            <TouchableOpacity onPress={() => {
                onClose?.();
                setIsAlert(!isAlert);
            }}>
                <CloseButton source={closeImage} />
            </TouchableOpacity>
        </AlertHeader>
        <AlertBody>
            <Text color='secondary'>{body}</Text>
        </AlertBody>
    </AlertWrapper>
}