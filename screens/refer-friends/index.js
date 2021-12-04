import React from "react";
import { Container, Canvas, Text, Button, ZentTokenBanner, Box } from 'components';
import { ReactNativeShare } from 'helpers';
import styled from 'styled-components/native';

// Import Icons
import {  FontAwesome } from '@expo/vector-icons';


// Styled Component
const InfoWrapper = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const InfoBody = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const InfoFooter = styled.View`
  width: 100%;
  flex-direction: column;
  padding-bottom: ${props => props.theme.spacing.lg};
`


// ReferFriend (Default)
export default function ReferFriends({ route, navigation }) {
    // Invite Friend (React Native Share)
    const inviteFriend = (message) => {
        ReactNativeShare(
            message,
            () => {
                // Shared
            },
            () => {
                // Dismissed
            },
            (err) => {
                // Error
            }
        );
    }

    const user = {
        fullname: 'Ella Loppez'
    }
    return (
        <Canvas>
            <Container style={{ flex: 1 }}>
                <ZentTokenBanner tokens={0.01} usd={0.00} />
                <InfoWrapper>
                    <InfoBody>
                        <FontAwesome name='user-circle-o' size={34} style={{ marginBottom: 12 }} color='white' />
                        <Text fontSize='h2' fontWeight='bold'>Refer a Friend</Text>
                        <Text fontSize='md' style={{ marginTop: 5 }}>Listen with your circle and earn more.</Text>
                    </InfoBody>
                    <InfoFooter>
                        <Button title='Invite friends' block onPress={() => inviteFriend(`${user.fullname} is inviting you to meditate with him/her. Zenbase is the fastest-growing meditation app with cryptocurrency rewards. \n\nJoin Here: https://zenbase.us`)} />
                        <Box h='10px' />
                        <Button title='Skip' variant='secondary' block onPress={() => { navigation.navigate('ZenbaseAds', { isForLogin: true }) }} />
                    </InfoFooter>
                </InfoWrapper>
            </Container>

        </Canvas>
    );
}
