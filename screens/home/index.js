import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  Container,
  Canvas,
  Box,
  SongList,
  CategoryList,
  Explorables,
} from "components";
import { ScrollView, Animated } from "react-native";
import useSearch from "queries/useSearch";
import useCategories from "queries/useCategories";
import Constants from 'expo-constants';
import { useTheme } from "stores/theme";
import Divider from "components/divider";
import styled from "styled-components/native";
import { BlurView } from 'expo-blur';


const PremiumTextWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
`

const BlurHeaderWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${Constants.statusBarHeight}px;
`

export default function Home() {
  const scrollY = useRef(new Animated.Value(0)).current;

  const bestNewSounds = useSearch();
  const { data: categories } = useCategories();
  const { theme } = useTheme();

  useEffect(() => {
    bestNewSounds.mutate({ sort: "-createdAt" });
  }, []);

  return (
    <>
      <Animated.ScrollView style={{ backgroundColor: theme.color.background }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <Box mt={`${Constants.statusBarHeight}px`} />

          <PremiumTextWrapper>
            <Text>Premium</Text>
          </PremiumTextWrapper>

          <Text fontSize="h2" fontWeight="bold">
            Explore
          </Text>
          <Explorables />

          <Divider style={{ marginBottom: 20 }} />

          <CategoryList categories={categories} />
          <SongList
            title="Best New Sounds"
            songs={bestNewSounds?.data?.results || []}
          />

          <SongList
            title="Under 10 Minutes"
            songs={bestNewSounds?.data?.results || []}
          />

          <SongList
            title="Guided Meditations"
            songs={bestNewSounds?.data?.results || []}
          />

          <SongList
            title="Chill"
            songs={bestNewSounds?.data?.results || []}
            showDivider={false}
          />
          <Box mt="20px"></Box>
        </Container>


      </Animated.ScrollView>
      <Animated.View style={{
        position: 'absolute',
        width: '100%',
        top: 0,
        left: 0,
        zIndex: scrollY.interpolate({
          inputRange: [20, 50],
          outputRange: [-1, 1]
        }),
        opacity: scrollY.interpolate({
          inputRange: [20, 50],
          outputRange: [0, 1]
        })
      }}>
        <BlurView intensity={150} style={{
          width: '100%',
          height: (Platform.OS == 'ios' ? Constants.statusBarHeight : 15) + 30,
          paddingBottom: (Platform.OS == 'android' ? 10 : 0)
        }} tint="dark">
          <BlurHeaderWrapper>
            <Text style={{ marginBottom: 15 }}>Explore</Text>
          </BlurHeaderWrapper>
        </BlurView>
      </Animated.View>
    </>
  );
}
