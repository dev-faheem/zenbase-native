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
    margin-top: ${props => props.theme.spacing.xxl}
    padding: ${props => props.theme.spacing.lg};
    background-color: ${props => props.theme.color.hud};
    border-radius: ${props => props.theme.borderRadius.lg}
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


export default function Alert({ title, body, onClose }) {
    const [isAlert, setIsAlert] = useState(true);

    return isAlert && <AlertWrapper>
        <AlertHeader>
            <Text fontSize="lg" fontWeight="bold">{title}</Text>
            <TouchableOpacity onPress={() => {
                if (typeof onClose == 'function') {
                    onClose();
                }
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