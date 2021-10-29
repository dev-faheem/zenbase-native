import Text from "components/text";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";

const SongWrapper = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

const SongImage = styled.Image`
  width: 35px;
  height: 35px;
  margin-right: 15px;
  border-radius: 2px;
`;

const SongTextWrapper = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Divider = styled.View`
  background-color: rgba(172, 178, 155, 0.5);
  height: 1px;
  width: 100%;
  margin-bottom: 5px;
  margin-top: 7px;
`;

export default function SongListing({ song, index }) {
  return (
    <SongWrapper>
      <SongImage source={{ uri: song.artwork }} />
      <SongTextWrapper>
        {index === 0 && <Divider />}
        <Text>{song.name}</Text>
        <Text color="secondary">Song • {song.artist.name}</Text>
        <Divider />
      </SongTextWrapper>
    </SongWrapper>
  );
}
