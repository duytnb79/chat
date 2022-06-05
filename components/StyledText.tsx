import { TextInput, TextInputProps } from "react-native";
import { Text, TextProps, useThemeColor } from "./Themed";

export function MonoText(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      {...props}
      style={[
        props.style,
        { fontFamily: "Helvetica" },
        { color },
        {
          lineHeight: 18,
          letterSpacing: 1,
          fontWeight: "300",
        },
      ]}
    />
  );
}
export function MonoTextInput(props: TextInputProps) {
  return (
    <TextInput {...props} style={[props.style, { fontFamily: "Helvetica" }]} />
  );
}
