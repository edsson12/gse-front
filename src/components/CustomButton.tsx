import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";

export interface ButtonPaynetProps extends ButtonProps {
  content: string;
  isLoadingButton?: boolean;
}

const CustomButtonStyled = styled(Button)(() => ({
  boxShadow: "none",
  fontSize: "16px",
  height: "32px",
  textTransform: "none",
  whiteSpace: "nowrap",
  minWidth: "auto",

  "&:hover": {
    boxShadow: "none",
  },

  "&.MuiButton-outlined": {
    border: "2px solid",
  },
}));

const CustomButton: React.FC<ButtonPaynetProps> = ({
  content,
  variant = "contained",
  color,
  isLoadingButton = false,
  ...props
}: ButtonPaynetProps) => {
  return (
    <CustomButtonStyled
      {...props}
      color={color}
      fullWidth
      variant={variant}
      disabled={isLoadingButton || props.disabled}
    >
      {content}
      {isLoadingButton && (
        <CircularProgress
          size={20}
          style={{ marginLeft: "8px", color: "inherit" }}
        />
      )}
    </CustomButtonStyled>
  );
};

export default CustomButton;
