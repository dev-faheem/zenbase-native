import React, { useState, useEffect, useRef } from "react";
import { Text, Container, Canvas, Button, TextInput } from "components";
import styled from "styled-components/native";
import { useTheme } from "stores/theme";
import { TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "services/axios";
import Country from "country-state-city/lib/country";
import State from "country-state-city/lib/state";
import { Dropdown } from "react-native-element-dropdown";
import * as AppleAuthentication from "expo-apple-authentication";

// Import Images
import AppleIcon from "assets/vectors/apple.png";
import GoogleIcon from "assets/vectors/google.png";
import { handleSignInWithApple } from "helpers/auth-apple";

// Styled Component
const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 12px;
  margin-bottom: 12px;
`;

const ZenbaseLogo = styled.Image`
  width: 219px;
  height: 60px;
  margin-bottom: 35px;
`;

const InputWrapper = styled.View`
  width: 100%;
  margin-top: 40px;
`;

const Input = styled.TextInput`
  width: 100%;
  height: 40px;
  padding: 8px;
  border-radius: 7.5px;
  background-color: ${(props) => props.theme.color.hud};
  color: ${(props) => props.theme.color.white};
  margin-top: 5px;
`;

const FooterWrapper = styled.View`
  width: 100%;
  height: 190px;
`;

const FooterFlex = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const FooterText = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 16px;
`;

const TextFlex = styled.View`
  flex-direction: row;
  justify-content: flex-start;
`;

export default function Register({ navigation }) {
  const { theme } = useTheme();
  const [isAppleAuthAvailable, setIsAppleAuthAvailable] = useState(false);

  useEffect(async () => {
    const _isAppleAuthAvailable = await AppleAuthentication.isAvailableAsync();
    setIsAppleAuthAvailable(_isAppleAuthAvailable);
  }, []);

  const DropdownProps = {
    style: {
      widht: "100%",
      height: 40,
      padding: 8,
      borderRadius: 7.5,
      backgroundColor: theme.color.hud,
      color: theme.color.white,
      marginTop: 5,
    },
    inputSearchStyle: {
      backgroundColor: theme.color.hud,
      borderWidth: 0,
      marginBottom: 0,
      color: theme.color.white,
      fontSize: 14,
    },
    containerStyle: {
      backgroundColor: theme.color.hud,
      borderWidth: 0,
      borderRadius: 7.5,
    },
    activeColor: theme.color.secondary,
    itemTextStyle: {
      color: theme.color.white,
      fontSize: 14,
    },
    selectedTextStyle: {
      backgroundColor: theme.color.hud,
      color: theme.color.white,
      fontSize: 14,
    },
  };

  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [countryValue, setCountryValue] = useState("");
  const [provinceValue, setProvinceValue] = useState("");

  const passwordInput = useRef();

  // Countries List
  const countries = [
    {
      label: Country.getCountryByCode("US").name,
      value: Country.getCountryByCode("US").isoCode,
      color: "white",
    },
    ...Country.getAllCountries()
      .map((country) => {
        return {
          label: country.name,
          value: country.isoCode,
        };
      })
      .filter((obj) => obj.value != "US"),
  ];

  const [provincesList, setProvincesList] = useState([]);

  // Input Handler
  const updateInput = (setState, value) => {
    setState(value);
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    let isValidEmail = true;
    if (!re.test(email)) {
      isValidEmail = false;
    }

    if (!isValidEmail) {
      setIsEmailError(true);
      setIsPasswordError(false);
      setErrorMessage("Please provide a valid email.");
    }

    if (email == "" || isValidEmail) {
      setIsEmailError(false);
      setIsPasswordError(false);
      setErrorMessage("");
    }
  };

  function parseJwt(token) {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  }

  const handleRegister = async () => {
    setIsEmailError(false);
    setIsPasswordError(false);

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    let errorMessage = "";
    if (trimmedEmail == "") {
      setIsEmailError(true);
      errorMessage = "Please provide a valid email.";
    }

    if (trimmedPassword == "") {
      setIsPasswordError(true);
      errorMessage = "Please provide a valid password.";
    }

    if (trimmedEmail == "" && trimmedPassword == "") {
      errorMessage = "Please provide a valid email and password.";
    }

    setErrorMessage(errorMessage);

    if (errorMessage == "") {
      // Good to go for signup
      try {
        const {
          data: { data },
        } = await axios.post("/auth/register", {
          phone: "",
          email,
          password,
          country: countryValue,
          state: provinceValue,
        });

        let value = email;

        navigation.navigate("OTP", {
          type: "email",
          value,
          userId: data._id,
          data,
        });
      } catch (e) {
        setIsEmailError(true);
        setErrorMessage(e?.response?.data?.error);
        console.log("error", e, e?.response?.data?.error);
      }
    }
  };

  const handleSignUpWithApple = async () => {
    const credentials = await handleSignInWithApple();
    if (!credentials.email) {
      console.error({ credentials });
      return alert("Something went wrong with Apple Sign Up");
    }

    try {
      const {
        data: { data },
      } = await axios.post("/auth/register", {
        phone: "",
        email: credentials.email,
        password: credentials.user,
        country: countryValue,
        state: provinceValue,
        apple_user_id: credentials.user,
      });

      let value = email;

      navigation.navigate("OTP", {
        type: "email",
        value,
        userId: data._id,
        data,
      });
    } catch (e) {
      setIsEmailError(true);
      setErrorMessage(e?.response?.data?.error);
      console.log("error", e, e?.response?.data?.error);
    }
  };

  return (
    <Canvas>
      <Header>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="ios-chevron-back" size={30} color={theme.color.primary} />
        </TouchableOpacity>
      </Header>
      <Container
        style={{
          flex: 1,
          justifyContent: "flex-start",
          flexDirection: "column",
        }}
      >
        <Text numberOfLines={1} adjustsFontSizeToFit fontSize="32" fontWeight="bold">
          Sign Up
        </Text>
        <InputWrapper>
          <Text>Email</Text>
          <TextInput
            StyledComponent={Input}
            onFocusStyle={{
              borderWidth: 1,
              borderColor: "#8f9094",
              borderLeftColor: Boolean(isEmailError) ? theme.color.red : "#8f9094",
            }}
            style={{
              ...(Boolean(isEmailError) && {
                borderLeftWidth: 10,
                borderLeftColor: theme.color.red,
              }),
            }}
            returnKeyType="done"
            autoCapitalize="none"
            selectionColor={theme.color.white}
            placeholder=""
            placeholderTextColor={theme.color.secondary}
            onChangeText={(value) => updateInput(setEmail, value)}
            value={email}
            onEndEditing={() => {
              validateEmail(email);
            }}
            onSubmitEditing={() => {
              if (!(email != "" && password != "")) {
                passwordInput.current.focus();
              }
            }}
          />

          <Text style={{ marginTop: 15 }}>Password</Text>
          <TextInput
            StyledComponent={Input}
            onFocusStyle={{
              borderWidth: 1,
              borderColor: "#8f9094",
              borderLeftColor: Boolean(isPasswordError) ? theme.color.red : "#8f9094",
            }}
            style={{
              ...(Boolean(isPasswordError) && {
                borderLeftWidth: 10,
                borderLeftColor: theme.color.red,
              }),
            }}
            returnKeyType="done"
            placeholder=""
            autoCapitalize="none"
            selectionColor={theme.color.white}
            placeholderTextColor={theme.color.secondary}
            onChangeText={(value) => updateInput(setPassword, value)}
            value={password}
            ref={passwordInput}
          />

          <TextFlex style={{ marginTop: 15 }}>
            <Text>Country</Text>
            <Text color="secondary" style={{ marginLeft: 8 }}>
              Optional
            </Text>
          </TextFlex>

          <Dropdown
            {...DropdownProps}
            data={countries}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder=""
            searchPlaceholder="Search..."
            value={countryValue}
            onChange={(item) => {
              setCountryValue(item.value);
              if (item.value == null) {
                setProvincesList([]);
              } else {
                setProvincesList(
                  State.getStatesOfCountry(item.value).map((state) => {
                    return {
                      label: state.name,
                      value: state.isoCode,
                      color: "white",
                    };
                  })
                );
              }
            }}
          />

          <TextFlex style={{ marginTop: 15 }}>
            <Text>State/Province</Text>
            <Text color="secondary" style={{ marginLeft: 8 }}>
              Optional
            </Text>
          </TextFlex>
          <Dropdown
            {...DropdownProps}
            data={provincesList}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder=""
            searchPlaceholder="Search..."
            value={provinceValue}
            onChange={(item) => {
              setProvinceValue(item.value);
            }}
          />
        </InputWrapper>

        <InputWrapper
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <Text fontWeight="600">{Boolean(errorMessage) && errorMessage} </Text>
        </InputWrapper>

        <Button
          variant={"primary"}
          title="Sign up"
          block
          style={{ marginTop: 6, marginBottom: 6 }}
          onPress={() => {
            handleRegister();
          }}
        />
      </Container>
      <FooterWrapper>
        <Container style={{ flex: 1 }}>
          <FooterFlex>
            {isAppleAuthAvailable && (
              <Button
                onPress={handleSignUpWithApple}
                variant="secondary"
                block
                borderRadius={theme.borderRadius.lg}
                height="55"
                fontSize="16"
                title="Sign in with Apple"
                titleProps={{
                  style: {
                    fontWeight: "600",
                  },
                }}
                image={
                  <Image
                    source={AppleIcon}
                    resizeMode=""
                    style={{
                      width: 14.17,
                      height: 17,
                      marginRight: 8,
                      marginTop: -2,
                    }}
                  />
                }
                style={{
                  marginTop: 5.5,
                  marginBottom: 5.5,
                }}
              />
            )}
            <Button
              onPress={() => {}}
              variant="secondary"
              block
              borderRadius={theme.borderRadius.lg}
              height="55"
              fontSize="16"
              title="Sign in with Google"
              titleProps={{
                style: {
                  fontWeight: "600",
                },
              }}
              image={
                <Image
                  source={GoogleIcon}
                  resizeMode=""
                  style={{
                    width: 17,
                    height: 17,
                    marginRight: 8,
                  }}
                />
              }
              style={{
                marginTop: 5.5,
                marginBottom: 5.5,
              }}
            />
            <FooterText>
              <TextFlex>
                <Text color="secondary" fontSize="12">
                  By signing in you accept our{" "}
                </Text>
                <TouchableOpacity>
                  <Text
                    color="secondary"
                    fontWeight="bold"
                    fontSize="12"
                    style={{ textDecorationLine: "underline" }}
                  >
                    Terms of use
                  </Text>
                </TouchableOpacity>
              </TextFlex>

              <TextFlex style={{ marginTop: 2 }}>
                <Text color="secondary" fontSize="12">
                  and{" "}
                </Text>
                <TouchableOpacity>
                  <Text
                    color="secondary"
                    fontWeight="bold"
                    fontSize="12"
                    style={{ textDecorationLine: "underline" }}
                  >
                    Privacy Policy
                  </Text>
                </TouchableOpacity>
              </TextFlex>
            </FooterText>
          </FooterFlex>
        </Container>
      </FooterWrapper>
    </Canvas>
  );
}
