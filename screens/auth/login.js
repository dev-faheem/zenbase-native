import React from "react";
import { Text, Container, Canvas, Button } from "components";
import { useNavigation } from "@react-navigation/core";
import { useAuth } from "stores/auth";

export default function Login() {
  const navigation = useNavigation();
  const { login } = useAuth();
  return (
    <Canvas>
      <Container center screen>
        <Text>Hello Login</Text>
        <Button
          title="Login"
          onPress={() => {
            login({ name: "Test User" });
            navigation.navigate("App", {
              screen: "Home",
            });
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
