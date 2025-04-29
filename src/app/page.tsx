/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import StepperPaynet from "@/components/Stepper";
import GeneralInformationStep from "@/components/Steps/StepOne";
import PaymentStep from "@/components/Steps/StepThree";
import LiquidationStep from "@/components/Steps/StepTwo";
import { Alert, Grid, Snackbar, SnackbarCloseReason } from "@mui/material";
import { useFormik } from "formik";
import { Suspense, useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import { GetDocuments, GetServices, GetVehicleTypes } from "./services/liquidation.services";
import { IDocument, IServices, IVehicleTypes } from "@/interfaces/interfaces";





export default function Home() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [documents, setDocuments] = useState<IDocument[]>([]);
  const [services, setServices] = useState<IServices[]>([]);
  const [vehicleTypes, setVehicleTypes] = useState<IVehicleTypes[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [snackMessage, setSnackMessage] = useState<string>("");
  const [snackSeverity, setSnackSeverity] = useState<"success" | "error">("success");
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const fetchAllData = useCallback(async () => {
    const [documents, services, vehicleTypes] = await Promise.all([
      GetDocuments(),
      GetServices(),
      GetVehicleTypes(),
    ])
    setDocuments(documents as IDocument[]);
    setServices(services as IServices[]);
    setVehicleTypes(vehicleTypes as IVehicleTypes[]);
  }, [])

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);


  const handleNext = (step: number) => {
    setActiveStep(step);
  };

  const handleBack = (step: number) => {
    setActiveStep(step);
  };

  const handleReset = () => {
    formik.resetForm();
    formik2.resetForm();
    setActiveStep(0);
  };

  const formik = useFormik({
    initialValues: {
      placa: "",
      placaConfirm: "",
      model: "",
      vehicleType: null,
      typeServices_Id: null,
      paymentMethod: "",
    },
    validationSchema: Yup.object().shape({
      placa: Yup.string()
        .required("Campo requerido")
        .matches(/^[A-Za-z]{3}[0-9]{3}$/, "Para esta prueba solo se maneja la validación 3 letras y 3 números"),
      placaConfirm: Yup.string()
        .required("Campo requerido")
        .matches(/^[A-Za-z]{3}[0-9]{3}$/, "Para esta prueba solo se maneja la validación 3 letras y 3 números")
        .test("match", "Las placas deben coincidir", function (val: any) {
          return val === this.parent.placa;
        }),
      model: Yup.string().required("Campo requerido"),
      vehicleType: Yup.string().required("Campo requerido"),
      typeServices_Id: Yup.string().required("Campo requerido"),
      paymentMethod: Yup.string().required("Campo requerido"),
    }),
    onSubmit: (values) => {
      handleNext(1);
    },
  });

  const formik2 = useFormik({
    initialValues: {
      documentType: '',
      documentNumber: "",
      name: "",
      lastName: "",
      address: "",
      phone: "",
      email: "",
    },
    validationSchema: Yup.object().shape({
      documentType: Yup.string()
        .required("Campo requerido"),
      documentNumber: Yup.string()
        .required("Campo requerido")
        .matches(/^[0-9]{5,15}$/, "Debe ser numérico y tener entre 5 y 15 dígitos"),
      name: Yup.string()
        .required("Campo requerido")
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/, "Solo letras, mínimo 2 caracteres"),
      lastName: Yup.string()
        .required("Campo requerido")
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/, "Solo letras, mínimo 2 caracteres"),
      address: Yup.string()
        .required("Campo requerido")
        .min(5, "Mínimo 5 caracteres")
        .max(100, "Máximo 100 caracteres"),
      phone: Yup.string()
        .required("Campo requerido")
        .matches(/^[0-9]{7,10}$/, "Debe ser numérico y tener entre 7 y 10 dígitos"),
      email: Yup.string()
        .email("Email inválido")
        .required("Campo requerido")
        .max(100, "Máximo 100 caracteres"),
    }),
    onSubmit: (values) => {
      handleNext(2);
    },
  });

  const steps = [
    {
      label: "Información general",
      content: (
        <GeneralInformationStep
          formik={formik}
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
          services={services}
          vehicleTypes={vehicleTypes}
        />
      ),
      expanded: activeStep >= 0 ? false : true,
    },
    {
      label: "Liquidación",
      content: <LiquidationStep handleBack={handleBack} formik2={formik2} documents={documents} />,
      expanded: activeStep === 1 ? true : false,
    },
    {
      label: "Pago",
      content: <PaymentStep handleBack={handleBack} handleReset={handleReset} formik={formik2} setSnackMessage={setSnackMessage}
        setSnackSeverity={setSnackSeverity}
        handleClick={handleClick}
      />,
      expanded: activeStep >= 2 ? true : false,
    },
  ];

  return (
    <Grid
      container
      spacing={2}
      size={4}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Grid
        size={{
          xs: 12,
          sm: 10,
          md: 12,
        }}
      ></Grid>
      <Suspense fallback={<div>Loading...</div>}>
        <StepperPaynet steps={steps} activeStep={activeStep} />
      </Suspense>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={6000}
        onClose={handleClose}


      // action={action}
      ><Alert
        onClose={handleClose}
        severity={snackSeverity}
        variant="filled"
        sx={{ width: '100%' }}
      >
          {snackMessage}
        </Alert></Snackbar>
    </Grid>
  );
}
