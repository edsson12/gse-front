"use client";

import { createTheme } from "@mui/material";
import { esES } from "@mui/material/locale";

const fontFamilyPaynet = "Mulish, sans-serif";

const componentsFontFamily = {
  MuiTypography: {
    styleOverrides: {
      root: {
        fontFamily: fontFamilyPaynet,
      },
    },
  },

  MuiButton: {
    styleOverrides: {
      root: {
        fontFamily: fontFamilyPaynet,
      },
    },
  },

  MuiTab: {
    styleOverrides: {
      root: {
        fontFamily: fontFamilyPaynet,
      },
    },
  },

  MuiMenuItem: {
    styleOverrides: {
      root: {
        fontFamily: fontFamilyPaynet,
      },
    },
  },

  MuiPickersDay: {
    styleOverrides: {
      root: {
        fontFamily: fontFamilyPaynet,
      },
    },
  },

  MuiDataGrid: {
    styleOverrides: {
      root: {
        "& .MuiTablePagination-selectLabel": {
          fontFamily: fontFamilyPaynet,
        },
        "& .MuiTablePagination-displayedRows": {
          fontFamily: fontFamilyPaynet,
        },
      },
    },
  },

  MuiInputLabel: {
    styleOverrides: {
      root: {
        fontFamily: fontFamilyPaynet,
      },
    },
  },

  MuiInputBase: {
    styleOverrides: {
      root: {
        fontFamily: fontFamilyPaynet,
      },
    },
  },

  MuiSelect: {
    styleOverrides: {
      root: {
        fontFamily: fontFamilyPaynet,
      },
    },
  },
};

export const theme = createTheme(esES, {
  typography: {
    fontFamily: "Mulish, sans-serif",
  },

  palette: {
    primary: { main: "#EA0029", contrastText: "#FFFFFF" },
    secondary: { main: "#AF0000", contrastText: "#FFFFFF" },
    tertiary: { main: "#EC4C35", contrastText: "#FFFFFF" },
    paynetDarkWhite: { main: "#FAF9FA" },
    paynetBlack: { main: "#1D1D1B", contrastText: "#FFFFFF" },
    paynetLightWhite: { main: "#FFFFFF" },
    paynetWhite: { main: "#FCFBFC" },
    paynetGray: { main: "#6D6B6B", contrastText: "#FFFFFF" },
    paynetDarkGray: { main: "#424040", contrastText: "#FFFFFF" },
    paynetLightGray: { main: "#CCCCCC" },
    paynetGreen: { main: "#52C051" },
    paynetAlertGreen: { main: "#0A8F22", contrastText: "#FFFFFF" },
    paynetAlertTeal: { main: "#4E8D93", contrastText: "#FFFFFF" },
    paynetAlertYellow: { main: "#F3A712", contrastText: "#FFFFFF" },
    test: { main: "#00E5FF", contrastText: "#FFFFFF" },
  },

  components: { ...componentsFontFamily },
});
