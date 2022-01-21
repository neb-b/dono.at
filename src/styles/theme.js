const fontStyles = {
  fontFamily: "body",
  lineHeight: "body",
  fontWeight: "body",
  color: "primaryText",
  fontSize: "body",
};

const inputStyles = {
  ...fontStyles,
  borderWidth: 1,
  borderStyle: "none",
  borderColor: "primaryText",
  borderRadius: 10,
  bg: "red",
  width: "100%",
  cursor: "text",
};

const theme = {
  fonts: {
    body: "system-ui, sans-serif",
  },
  colors: {
    primaryText: "red",
    black: "#000e1a",
    white: "#fff",
    blue: "#007ce0",
    navy: "#004175",
  },
  buttons: {
    primary: {
      cursor: "pointer",
      color: "white",
      bg: "black",
    },
  },
  forms: {
    input: {
      normal: {
        ...inputStyles,
        px: 3,
        height: 48,
      },
      thin: {
        ...inputStyles,
        px: 2,
        height: 34,
      },
    },

    textarea: {
      ...inputStyles,
      p: 3,
    },

    select: {
      ...inputStyles,
      height: 48,
      option: {
        outline: "none",
        borderWidth: 1,
        borderStyle: "none",
        borderColor: "primaryText",
        position: "relative",
      },
    },

    label: {
      ...fontStyles,
      width: "auto",
    },
  },
};

const fontSizes = [13, 16, 19, 20, 40, 60, 64, 80];
fontSizes.xs = fontSizes[0];
fontSizes.s = fontSizes[1];
fontSizes.m = fontSizes[2];
fontSizes.l = fontSizes[3];
fontSizes.xl = fontSizes[4];
fontSizes.xxl = fontSizes[5];
fontSizes.xxxl = fontSizes[6];
fontSizes.xxxxl = fontSizes[7];
fontSizes.heading = fontSizes[3];
fontSizes.body = fontSizes[3];

export default { ...theme, fontSizes };
