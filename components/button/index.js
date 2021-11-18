import React from "react";
import Text from "components/text";
import styled from "styled-components/native";
import Icon from "components/icon";

const variants = {
  primary: {
    background: "primary",
    color: "white",
  },
  secondary: {
    background: "hud",
    color: "white",
  },
  disabled: {
    background: "hud",
    color: "informationBackground",
  },
  information: {
    background: "informationBackground",
    color: "information",
  },
  danger: {
    background: 'red',
    color: 'white'
  },
  silent: {
    background: "transparent",
    color: "primary",
  },
  silentDisabled: {
    background: "transparent",
    color: "informationBackground",
  },
};

const TouchableOpacityWrapper = styled.TouchableOpacity`
  width: ${(props) => (props.block ? "100%" : "auto")};
`;

const ButtonWrapper = styled.View`
  background: ${(props) =>
    props.variant
      ? props.theme.color[variants[props.variant]?.background] ||
      props.theme.color.primary
      : props.theme.color.primary};

  width: ${(props) => (props.block ? "100%" : "auto")};
  height: 42px;
  padding-horizontal: ${(props) => props.theme.spacing.xxl};
  border-radius: ${(props) => props.theme.borderRadius.md};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const TextWrapper = styled(Text)`
  font-size: 16px;
  color: ${(props) =>
    props.variant
      ? props.theme.color[variants[props.variant]?.color] ||
      props.theme.color.white
      : props.theme.color.white};
  font-weight: 500;
`;

export default function Button({
  title,
  icon = null,
  iconProps = {},
  ...props
}) {
  return (
    <TouchableOpacityWrapper {...props}>
      <ButtonWrapper {...props}>
        {icon && <Icon variant={icon} {...iconProps} />}
        <TextWrapper {...props}>{title || "Button"}</TextWrapper>
      </ButtonWrapper>
    </TouchableOpacityWrapper>
  );
}
