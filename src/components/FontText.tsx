import { StyleProp, Text, TextProps, TextStyle } from "react-native";

const CUSTOM_FONT_FAMILY: { [key: string]: string } = {
  thin: "DegularDisplayThin",
  thinItalic: "DegularDisplayThinItalic",
  light: "DegularDisplayLight",
  lightItalic: "DegularDisplayLightItalic",
  regular: "DegularDisplayRegular",
  italic: "DegularDisplayRegularItalic",
  medium: "DegularDisplayMedium",
  mediumItalic: "DegularDisplayMediumItalic",
  semibold: "DegularDisplaySemibold",
  semiboldItalic: "DegularDisplaySemiboldItalic",
  bold: "DegularDisplayBold",
  boldItalic: "DegularDisplayBoldItalic",
  black: "DegularDisplayBlack",
  blackItalic: "DegularDisplayBlackItalic",
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
  if (!style) return {};

  const styleObject = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  const { fontWeight, fontStyle, ...remainingStyle } = styleObject;

  if (!fontWeight && !fontStyle) return styleObject;

  const fontWeightKey = FONT_WEIGHT_MAP[fontWeight] || "regular";
  const fontFamilyKey =
    fontStyle === "italic" ? `${fontWeightKey}Italic` : fontWeightKey;

  return { fontFamily: CUSTOM_FONT_FAMILY[fontFamilyKey], ...remainingStyle };
};

export const FontText = (props: TextProps) => {
  return (
    <Text {...props} style={fontStyleAndWeightAsFontFamily(props.style)} />
  );
};
