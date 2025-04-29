// src/components/PSEButton.tsx

import React from "react";
import { Radio, RadioProps, styled } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FaceIcon from '@mui/icons-material/Face';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';


const paymentIcons: { [key: string]: React.ReactNode } = {
  "Link de pago - PSE": <FaceIcon style={{ fontSize: 40 }} />,
  Datafono: <FaceIcon style={{ fontSize: 40 }} />,
  "Pasarela propia": <FaceIcon style={{ fontSize: 40 }} />,
  Efectivo: <PaymentsOutlinedIcon style={{ fontSize: 40 }} />,
  "Datafono Propio": <FaceIcon style={{ fontSize: 40 }} />,
  "Corresponsales bancarios": <StoreOutlinedIcon style={{ fontSize: 40 }} />,
  Propio: <FaceIcon style={{ fontSize: 40 }} />,
};

const mainColor = "#EC4C35";

const CustomRadio = styled(Radio, {
  shouldForwardProp: (prop) => prop !== "iconColor" && prop !== "textColor"
})<{ iconColor: string; textColor: string }>(
  ({ theme }) => ({
    width: 160,
    height: 120,
    borderRadius: "16px",
    border: `1.5px solid ${theme.palette.divider}`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    boxShadow: "none",
    color: "#222",
    fontWeight: 400,
    transition: "border-color 0.2s, box-shadow 0.2s",
    "&:hover": {
      borderColor: "#EA0029",
      backgroundColor: "#f7fbff",
    },
    "& .MuiSvgIcon-root": {
      color: "#EA0029",
      fontSize: 36,
    },
    "&.Mui-checked": {
      borderColor: "#EC4C35",
      backgroundColor: "#e3f2fd",
      "& .MuiSvgIcon-root": {
        color: "#EC4C35",
      },
    },
  })
);

const IconWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 8,
});

const LabelWrapper = styled("div")({
  textAlign: "center",
  fontSize: 15,
  color: "#222",
  fontWeight: 500,
  letterSpacing: 0.2,
});

const CheckIconWrapper = styled("div")({
  position: "absolute",
  top: 8,
  right: 8,
  color: "#EC4C35",
  background: "#fff",
  borderRadius: "50%",
  boxShadow: "0 1px 4px rgba(25, 118, 210, 0.08)",
  padding: 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

interface PaymentRadioProps extends RadioProps {
  iconName: string;
  iconColor?: string;
  textColor?: string;
}

const PaymentRadio: React.FC<PaymentRadioProps> = ({
  iconName,
  iconColor = mainColor,
  textColor = mainColor,
  ...props
}) => {
  return (
    <CustomRadio
      iconColor={iconColor}
      textColor={textColor}
      icon={
        <div>
          <IconWrapper>
            {paymentIcons[iconName] || <FaceIcon style={{ fontSize: 40 }} />}
          </IconWrapper>
          <LabelWrapper>{iconName}</LabelWrapper>
        </div>
      }
      checkedIcon={
        <div>
          <IconWrapper>
            {paymentIcons[iconName] || <FaceIcon style={{ fontSize: 40 }} />}
          </IconWrapper>
          <CheckIconWrapper>
            <CheckCircleIcon style={{ fontSize: 25 }} />
          </CheckIconWrapper>
          <LabelWrapper>{iconName}</LabelWrapper>
        </div>
      }
      {...props}
    />
  );
};

export default PaymentRadio;
