import { StyleProp, Text, TextProps, TextStyle } from "react-native";

const CUSTOM_FONT_FAMILY: { [key: string]: string } = {
  thin: "DegularThin",
  thinItalic: "DegularThinItalic",
  light: "DegularLight",
  lightItalic: "DegularLightItalic",
  regular: "DegularRegular",
  regularItalic: "DegularRegularItalic",
  medium: "DegularMedium",
  mediumItalic: "DegularMediumItalic",
  semibold: "DegularSemibold",
  semiboldItalic: "DegularSemiboldItalic",
  bold: "DegularBold",
  boldItalic: "DegularBoldItalic",
  black: "DegularBlack",
  blackItalic: "DegularBlackItalic",
};

const FONT_WEIGHT_MAP: { [key: string]: string } = {
  "200": "thin",
  "300": "light",
  "400": "regular",
  "500": "medium",
  "600": "semibold",
  "700": "bold",
  "800": "black",
};

const fontStyleAndWeightAsFontFamily = (style: StyleProp<TextStyle>) => {
  if (!style) return { fontFamily: "DegularMedium" };

  const styleObject = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  const { fontWeight, fontStyle, ...remainingStyle } = styleObject;

  const fontWeightKey = FONT_WEIGHT_MAP[fontWeight] || fontWeight || "regular";
  const fontFamilyKey =
    fontStyle === "italic" ? `${fontWeightKey}Italic` : fontWeightKey;

  return {
    fontFamily: CUSTOM_FONT_FAMILY[fontFamilyKey],
    paddingBottom: 2.5,
    ...remainingStyle,
  };
};

export const FontText = (props: TextProps) => {
  return (
    <Text {...props} style={fontStyleAndWeightAsFontFamily(props.style)} />
  );
};
