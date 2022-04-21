import React, { useState, useEffect, useRef } from "react";
import { Text, Container, Canvas, Button, Box } from "components";
import { useNavigation } from "@react-navigation/core";
import { StackActions, CommonActions } from "@react-navigation/native";
import styled from "styled-components/native";
import { useAuth } from "stores/auth";
import DropDownPicker from "react-native-dropdown-picker";
DropDownPicker.setTheme("DARK");

// Import Images
import ZentbaseLogoPrimary from "assets/images/zenbase-full-primary-logo.png";
import { useTheme } from "stores/theme";
import { ScrollView, TouchableOpacity, View } from "react-native";
import Loader from "components/loader";
import { useLoader } from "stores/loader";
import axios from "services/axios";
import { Picker, PickerIOS } from "@react-native-picker/picker";
import Country from "country-state-city/dist/lib/country";
import State from "country-state-city/dist/lib/state";

// Styled Component
const ZenbaseLogo = styled.Image`
  width: 176px;
  height: 48px;
  margin-top: ${(props) => props.theme.spacing.md};
`;
const InputWrapper = styled.View`
  width: 100%;
  margin-top: 40px;
`;

const Input = styled.TextInput`
  width: 100%;
  height: 40px;
  padding: ${(props) => props.theme.spacing.sm};
  border-radius: ${(props) => props.theme.borderRadius.md};
  background-color: ${(props) => props.theme.color.hud};
  color: ${(props) => props.theme.color.white};
  margin-top: ${(props) => props.theme.spacing.md};
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

const TermsAndPrivacyWrapper = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: ${(props) => props.theme.spacing.lg};
`;

const TermsAndPrivacyFlex = styled.View`
  flex-direction: row;
  justify-content: flex-start;
`;

const dropdownProps = {
  itemProps: {
    // style: {
    //   backgroundColor: '#1B1C1E',
    //   // height: 45,
    //   paddingHorizontal: 10,
    //   paddingVertical: 10,
    // },
    // activeOpacity: 1,
  },
  style: {
    backgroundColor: "#1B1C1E",
    height: 45,
    borderRadius: 5,
    marginTop: 10,
  },
  containerStyle: {
    zIndex: 10,
  },
  textStyle: {
    color: "#8F9094",
  },
  labelStyle: {
    color: "white",
  },
  disabledStyle: {
    color: "white",
  },

  dropDownContainerStyle: {
    height: 120,
    zIndex: 10000000,
    backgroundColor: "#1B1C1E",
  },
  zIndex: 100000,
  zIndexInverse: 100000,
};

export default function register({ navigation }) {
  const { theme } = useTheme();

  const passwordInput = useRef();

  const { setLoading, renderLoader } = useLoader();

  // States
  const [isRegisterEnabled, setIsRegisterEnabled] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [country, setCountry] = useState('');
  // const [state, setState] = useState('');

  const [openCountry, setOpenCountry] = useState(false);
  const [valueCountry, setValueCountry] = useState(null);
  const [countries, setCountries] = useState([
    {
      label: Country.getCountryByCode("US").name,
      value: Country.getCountryByCode("US").isoCode,
    },
    ...Country.getAllCountries()
      .map((country) => {
        return {
          label: country.name,
          value: country.isoCode,
        };
      })
      .filter((obj) => obj.value != "US"),
  ]);

  const [openState, setOpenState] = useState(false);
  const [valueState, setValueState] = useState(null);
  const [states, setStates] = useState([]);

  const { login } = useAuth();

  // Input Handler
  const updateInput = (setState, value) => {
    setState(value);
  };

  // Register Handler
  const registerHandler = async () => {
    setLoading(true);

    try {
      const {
        data: { data },
      } = await axios.post("/auth/register", {
        // name,
        // phone: phoneNumber,
        // username,
        email,
        password,
        country: valueCountry,
        state: valueState,
      });

      login(data);
      navigation.navigate("SignupBonus");
    } catch (error) {
      axios.handleError(error);
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (email.trim() == "" || password == "") {
      setIsRegisterEnabled(false);
    } else {
      setIsRegisterEnabled(true);
    }
  }, [email, password]);

  return (
    <Canvas>
      {renderLoader()}
      <Container style={{ flex: 1 }}>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          fontSize="34"
          fontWeight="bold"
          style={{ marginTop: 10 }}
        >
          Meditate, Earn, Repeat
        </Text>
        <ZenbaseLogo source={ZentbaseLogoPrimary} />

        <InputWrapper>
          <Input
            returnKeyType="done"
            autoCapitalize="none"
            placeholder="Phone number or Email"
            placeholderTextColor={theme.color.secondary}
            onChangeText={(value) => updateInput(setEmail, value)}
            value={email}
            onSubmitEditing={() => passwordInput.current.focus()}
          />

          <Input
            returnKeyType="done"
            placeholder="Password"
            placeholderTextColor={theme.color.secondary}
            onChangeText={(value) => updateInput(setPassword, value)}
            secureTextEntry={true}
            value={password}
            ref={passwordInput}
          />

          <DropDownPicker
            open={openCountry}
            value={valueCountry}
            items={countries}
            setOpen={setOpenCountry}
            setValue={(value) => {
              setValueCountry(value);
              setStates(
                State.getStatesOfCountry(value()).map((state) => {
                  return {
                    label: state.name,
                    value: state.isoCode,
                  };
                })
              );
            }}
            setItems={setCountries}
            placeholder="Country"
            {...dropdownProps}
          />

          {openCountry && <View style={{ height: 100 }} />}

          <DropDownPicker
            open={openState}
            value={valueState}
            items={states}
            setOpen={setOpenState}
            setValue={setValueState}
            setItems={setStates}
            placeholder="State/Province"
            {...dropdownProps}
          />

          {openState && <View style={{ height: 100 }} />}

          {/* <Input
              autoCapitalize="none"
              placeholder="Country"
              placeholderTextColor={theme.color.secondary}
              onChangeText={(value) => updateInput(setEmail, value)}
              value={email}
              onSubmitEditing={() => passwordInput.current.focus()}
            />

            <Input
              autoCapitalize="none"
              placeholder="State"
              placeholderTextColor={theme.color.secondary}
              onChangeText={(value) => updateInput(setEmail, value)}
              value={email}
              onSubmitEditing={() => passwordInput.current.focus()}
            /> */}
        </InputWrapper>

        <InputWrapper
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ padding: 15 }}
          >
            <Text color={"primary"} fontWeight="600">
              Already have an account
            </Text>
          </TouchableOpacity>
        </InputWrapper>
      </Container>
      <FooterWrapper>
        <Container style={{ flex: 1 }}>
          <FooterFlex>
            <Box h="60px" />
            <Button
              variant={isRegisterEnabled ? "primary" : "disabled"}
              title="Continue"
              block
              onPress={() => {
                if (isRegisterEnabled) {
                  registerHandler();
                }
              }}
            />
            <TermsAndPrivacyWrapper>
              <TermsAndPrivacyFlex>
                <Text>By signing in you accept our </Text>
                <TouchableOpacity>
                  <Text
                    fontWeight="bold"
                    style={{ textDecorationLine: "underline" }}
                  >
                    Terms of use
                  </Text>
                </TouchableOpacity>
              </TermsAndPrivacyFlex>

              <TermsAndPrivacyFlex style={{ marginTop: 2 }}>
                <Text>and </Text>
                <TouchableOpacity>
                  <Text
                    fontWeight="bold"
                    style={{ textDecorationLine: "underline" }}
                  >
                    Privacy Policy
                  </Text>
                </TouchableOpacity>
              </TermsAndPrivacyFlex>
            </TermsAndPrivacyWrapper>
          </FooterFlex>
        </Container>
      </FooterWrapper>
    </Canvas>
  );
}
