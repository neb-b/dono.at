const fontStyles = {
  fontFamily: "body",
  lineHeight: "body",
  fontWeight: "body",
  color: "primaryText",
  fontSize: "body",
};

const inputStyles = {
  ...fontStyles,
  mt: 1,
  fontWeight: "normal",
  height: "56px",
  fontSize: "19px",
  lineHeight: "1.32",
  borderWidth: 1,
  borderRadius: 10,
  width: "100%",
  borderColor: "transparent",
  bg: "#1c1c1e",
  cursor: "text",
  outline: "none",
  position: "relative",
  // maxWidth: ["100%", "400px"],

  "::-webkit-search-decoration:hover, ::-webkit-search-cancel-button:hover": {
    cursor: "pointer",
  },
  "::placeholder": {
    color: "gray18",
  },
  "&:disabled": {
    bg: `rgba(235,235,245,0.3)`,
    opacity: 0.6,
  },
  ":not(select)&:read-only": {
    opacity: 0.6,
  },
  "&:focus": {
    borderColor: "white",
  },
};

const buttonFontStyle = {
  letterSpacing: "-0.19px",
  fontSize: 3,
  fontWeight: "bold",
  height: "56px",
  cursor: "pointer",
  borderRadius: "30px",
  px: 4,
  py: 3,
  pt: "14px",
};

const theme = {
  fonts: {
    body: "Montserrat, Futura, system-ui, sans-serif",
  },
  colors: {
    primaryText: "white",
    black: "#000e1a",
    gray: "rgba(235,235,245,0.6)",
    gray18: "rgba(235,235,245,0.18)",
    white: "#fff",
    blue: "#007ce0",
    navy: "#004175",
    api: "#CCFF00",
    apiLight: "rgb(219, 255, 77)",
  },
  buttons: {
    primary: {
      ...buttonFontStyle,
      color: "black",
      bg: "black",
      backgroundColor: "#CCFF00",
      fontWeight: "bold",

      ":hover": {
        bg: "apiLight",
      },
    },
    secondary: {
      ...buttonFontStyle,
      cursor: "pointer",
      color: "black",
      backgroundColor: "white",
    },
    outline: {
      ...buttonFontStyle,
      bg: "transparent",
      border: "1px solid white",
      ":hover": {
        bg: "white",
        color: "black",
        borderColor: "white",
      },
    },
    link: {
      ...buttonFontStyle,
      bg: "transparent",
      border: "1px solid white",
    },
  },
  forms: {
    input: {
      normal: {
        ...inputStyles,
        fontWeight: "bold",

        "::placeholder": {
          color: "gray18",
        },
      },
    },

    textarea: {
      ...inputStyles,
      height: "100px",
      p: 3,
    },

    label: {
      ...fontStyles,
      width: "auto",
      fontWeight: "bold",
      color: "gray",
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
