import * as React from "react";
import { View, StyleSheet } from "react-native";
import _, { find } from "lodash";
import produce from "immer";
import range from "./utils/range";
import { Picker } from "@react-native-picker/picker";

const PickerFactory = ({ pickerProps, selectedValue, onChange, pickerStyle, itemStyle }) => {
  const { id, label = "", min, max } = pickerProps;
  const numbers = range(min, max);

  return (
    <Picker
      style={{ ...styles.picker, ...pickerStyle }}
      selectedValue={selectedValue}
      onValueChange={(value) => onChange({ id, value })}
      itemStyle={itemStyle}
    >
      {numbers.map((number, index) => (
        <Picker.Item key={`${id}-${number}-${index}`} value={number} label={`${number} ${label}`} />
      ))}
    </Picker>
  );
};

const NumberPlease = ({ digits, values, onChange, ...rest }) => {
  const onChangeHandle = (value) => {
    const nextValues = produce(values, (draft) => {
      const index = _?.findIndex(draft, { id: value.id });
      draft[index] = value;
    });

    onChange(nextValues);
  };

  return (
    <View style={styles.container}>
      {digits.map((picker, index) => {
        const pickerValues = find(values, { id: picker.id });
        return (
          <PickerFactory
            key={`${picker.id}-picker-${index}`}
            pickerProps={picker}
            selectedValue={pickerValues?.value}
            onChange={onChangeHandle}
            {...rest}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  picker: {
    height: "100%",
    width: 90,
  },
});

export default NumberPlease;
