/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  CircularProgress,
  InputAdornment,
  OutlinedTextFieldProps,
  TextField,
} from "@mui/material";

export interface CustomInput extends Partial<OutlinedTextFieldProps> {
  content?: string;
  helperText?: any;
  startAdornment?: React.JSX.Element;
  isLoading?: boolean;
}

const styles = {
  "& .MuiFilledInput-root": {
    backgroundColor: "white",
    color: "black",
    input: {
      "&:-webkit-autofill": {
        boxShadow: "0 0 0 100px white inset",
        WebkitBoxShadow: "0 0 0 100px white inset",
        WebkitTextFillColor: "black",

      },
    },
  },
  "& .MuiFormHelperText-root": {
    margin: "3px 0px 0px",
  },
  "& .MuiFormHelperText-root.Mui-error": {
    position: "absolute",
    top: "100%",
  },
};

const CustomInput: React.FC<CustomInput> = ({ isLoading, ...props }) => {
  return (
    <>
      <TextField
        fullWidth
        variant="filled"
        size="small"
        InputProps={{
          endAdornment: isLoading ? (
            <InputAdornment position="end">
              <CircularProgress size={20} />
            </InputAdornment>
          ) : null,
        }}
        {...props}
        sx={styles}
      />
    </>
  );
};

export default CustomInput;
