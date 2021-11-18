import React from "react";
import { Text, Container, Canvas, Button } from "components";
import { useNavigation } from "@react-navigation/core";
import { StackActions, CommonActions } from "@react-navigation/native";

import { useAuth } from "stores/auth";

export default function Login() {
  const navigation = useNavigation();
  const { login } = useAuth();
  return (
    <Canvas>
      <Container center screen>
        <Button
          title="Login"
          onPress={() => {
            login({ name: "Test User" });

            // Reset Stack Navigation
            navigation.dispatch(
              CommonActions.reset({
                routes: [
                  { name: 'App' },
                ],
              })
            );
            
          }}
        />
        <Button
          title="Create an account"
          variant="silent"
          onPress={() => {
            navigation.navigate("Register");
          }}
        />
      </Container>
    </Canvas>
  );
}
