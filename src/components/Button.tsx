import {
  ButtonProps,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { FontText } from "./FontText";
import Colors from "@/constants/Colors";

type Props = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function Button({
  title,
  onPress,
  children,
  style,
  textStyle,
}: ButtonProps & Props) {
  return (
    <Pressable style={[styles.button, style]} onPress={onPress}>
      <FontText style={[styles.text, textStyle]}>{title}</FontText>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.tint,
    flexDirection: "row",
    gap: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  text: { fontWeight: 600, fontSize: 25, color: "white" },
});
