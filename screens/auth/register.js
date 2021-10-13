import React from "react";
import { Text, Container, Canvas, Button } from "components";
import { useNavigation } from "@react-navigation/core";

export default function Register() {
  const navigation = useNavigation();
  return (
    <Canvas>
      <Container center screen>
        <Text>Hello Register</Text>
        <Button
          title="I already have an account"
          variant="silent"
          onPress={() => {
            navigation.navigate("Login");
          }}
        />
      </Container>
    </Canvas>
  );
}
