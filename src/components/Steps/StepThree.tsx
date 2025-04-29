/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, Button, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, RadioGroup, Snackbar, SnackbarCloseReason } from "@mui/material";
import { useFormik } from "formik";
import CustomButton from "../CustomButton";
import PaymentRadio from "../PaymentRadio";
import * as Yup from "yup";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { SaveClient } from "@/app/services/liquidation.services";

interface PaymentStepProps {
  handleBack: (step: number) => void;
  handleReset: () => void;
  formik: any;
  setSnackMessage: React.Dispatch<React.SetStateAction<string>>;
  setSnackSeverity: React.Dispatch<React.SetStateAction<"success" | "error">>;
  handleClick: () => void;
}
const PaymentStep = ({ handleBack, handleReset, formik, setSnackMessage, setSnackSeverity, handleClick }: PaymentStepProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);




  const formikPayment = useFormik({
    initialValues: {
      paymentMethod: "",
    },
    validationSchema: Yup.object().shape({
      paymentMethod: Yup.object().required("Seleccione un método de pago"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      const { name,
        documentType,
        documentNumber,
        lastName,
        address,
        phone,
        email } = formik.values;

      const { success, data } = await SaveClient({
        name: name,
        document_type: documentType,
        document_number: documentNumber,
        last_name: lastName,
        address: address,
        phone: phone,
        email: email,
      })
      if (!success) {
        setSnackMessage((data as any)?.error?.message || "Error al guardar el cliente");
        setSnackSeverity("error");
        handleClick();
        setIsLoading(false);
        return;
      };

      setSnackMessage("Pago realizado con éxito y cliente guardado");
      setSnackSeverity("success");
      handleClick();
      setIsLoading(false);
      handleReset();


    },
  });



  return (
    <>
      <form onSubmit={formikPayment.handleSubmit}>
        <FormControl sx={{ width: "100%" }}>
          <RadioGroup
            row
            id="paymentMethod"
            aria-label="paymentMethod"
            name="paymentMethod"
            value={(formikPayment.values.paymentMethod as any)?.name || ""}
            onChange={(event) => {
              const selectedId = event.target.value;
              const selectedChannel = channels.find((channel: any) => channel.name === selectedId);
              formikPayment.setFieldValue("paymentMethod", selectedChannel);
            }}
            sx={{
              width: "100%",
              justifyContent: "flex-start",
              flexWrap: "wrap",
              gap: 4,
              margin: "16px",
            }}
          >
            {channels.map((channel: any) => (
              <FormControlLabel
                key={channel.name.trim()}
                value={channel.name.trim()}
                control={
                  <PaymentRadio
                    iconName={channel?.name?.trim() || "No disponible"}
                  />
                }
                label={""}
              />
            ))}
          </RadioGroup>
        </FormControl>
        {formikPayment.touched.paymentMethod &&
          formikPayment.errors.paymentMethod && (
            <FormHelperText error>
              {(formikPayment.errors as any).paymentMethod}
            </FormHelperText>
          )}

        <Grid container gap={2} mt={4} justifyContent="flex-end">
          <Grid size={3} >
            <CustomButton
              onClick={() => {
                handleBack(1);
              }}
              content="Volver"
              variant="outlined"
            />
          </Grid>
          <Grid size={3} >
            <CustomButton
              onClick={() => {
                handleReset();
              }}
              content="Cancelar"
              variant="outlined"
            />
          </Grid>

          <Grid size={3} >
            <CustomButton
              isLoadingButton={isLoading}
              disabled={!formikPayment.values.paymentMethod}
              type="submit"
              content="Pagar"
            />
          </Grid>
        </Grid>

      </form>
    </>
  );
};

export default PaymentStep;

const channels = [
  { name: 'Link de pago - PSE', id: '1' },
  { name: 'Pasarela propia', id: '2' },
  { name: 'Datafono Propio', id: '3' },
  { name: 'Corresponsales bancarios', id: '4' },
  { name: 'Efectivo', id: '5' },
  { name: 'Datafono', id: '6' },
];

