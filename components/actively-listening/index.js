import styled from 'styled-components/native';
import { Text } from 'components';
import ZenbaseWhiteVector from 'assets/vectors/zenbase-white.png';
import { useState, useEffect } from 'react';
import axios from 'services/axios';

const ActivelyListingView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 6px;
`;

const ZenbaseWhiteImage = styled.Image`
  width: 17px;
  height: 17px;
  margin-right: 5px;
`;

export default function ActivelyListing() {
  const [activelyListening, setActivelyListening] = useState(null);

  useEffect(() => {
    fetchActivelyListening();

    const intervalId = setInterval(fetchActivelyListening, 60 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const fetchActivelyListening = async () => {
    try {
      const {
        data: { data },
      } = await axios.get('/auth/active');
      setActivelyListening(data);
    } catch (e) {
      console.log(e);
    }
  };

  if (activelyListening === null) return null;

  return (
    <ActivelyListingView>
      <ZenbaseWhiteImage source={ZenbaseWhiteVector} />
      <Text color="white">
        {activelyListening} {activelyListening == 1 ? 'person' : 'people'}{' '}
        listening
      </Text>
    </ActivelyListingView>
  );
}
