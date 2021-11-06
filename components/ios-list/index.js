// Import Dependencies
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'stores/theme';
import Text from 'components/text';


const ListWrapper = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
`

const ListContentWrapper = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    border-bottom-width: 1px;
    border-bottom-color: ${props => props.theme.color.informationBackground};
    margin-left: ${props => props.theme.spacing.lg};
`

const VAlignCenter = styled.View`
    padding-top: ${props => props.theme.spacing.md};
    padding-bottom: ${props => props.theme.spacing.md};
    flex-direction: column;
    justify-content: center;
`

export default function IOSList({ data = [], transparent, notDefault, style }) {

    const { theme } = useTheme();

    return <View style={
        !transparent 
            ? { ...style, backgroundColor: theme.color.hud } 
            : (notDefault ? style: { 
                ...style, 
                borderTopWidth: 1, 
                borderTopColor: theme.color.informationBackground,
                borderBottomWidth: 1, 
                borderBottomColor: theme.color.informationBackground 
            })
        }>
        {data.map((obj, index) => {
            /**
             * obj: {
             *   icon,   # Componet 
             *   title,  # Text
             *   onPress # Function
             * }
             */
            return <TouchableOpacity onPress={obj.onPress || null} style={{ width: '100%' }}>
                <ListWrapper>
                    <VAlignCenter style={{ marginLeft: 5 }}>
                        {obj.icon}
                    </VAlignCenter>
                    <ListContentWrapper style={!(transparent && notDefault) && data.length - 1 == index && { borderBottomWidth: 0}}>
                        <VAlignCenter>
                            <Text color={obj.color || 'white'}>{obj.title}</Text>
                        </VAlignCenter>
                        <VAlignCenter style={{ paddingRight: 5 }}>
                            <Ionicons name="ios-chevron-forward" size={24} color={theme.color.information} />
                        </VAlignCenter>
                    </ListContentWrapper>
                </ListWrapper>
            </TouchableOpacity>
        })}
    </View>
}