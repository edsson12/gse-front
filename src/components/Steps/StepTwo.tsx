/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  debounce,
  Divider,
  FormHelperText,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import CustomSelect from "../CustomSelect";
import CustomInput from "../CustomInput";
import { formatValueToDecimals } from "@/utils/FormatValueToDecimals";
import CustomButton from "../CustomButton";
import { IDocument } from "@/interfaces/interfaces";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GetClients } from "@/app/services/liquidation.services";

interface LiquidationStepProps {
  handleBack: (step: number) => void;
  formik2: any;
  documents: IDocument[];
}

const LiquidationStep = ({ handleBack, formik2, documents }: LiquidationStepProps) => {
  const [isLoadingCard, setIsLoadingCard] = useState<boolean>(false);
  const [isLoadingInput, setIsLoadingInput] = useState<boolean>(false);

  useEffect(() => {
    setIsLoadingCard(true);
    setTimeout(() => {
      setIsLoadingCard(false);
    }, 2000);

  }, []);

  const mappedDocuments = documents.map((item) => {
    return { id: item._id, name: item.name };
  })
  const cardValues = [
    {
      type: "AGE",
      chargeValue: 20000,
    },
    {
      type: "SIC",
      chargeValue: 10000,
    },
    {
      type: "REC",
      chargeValue: 5000,
    },
  ];

  // const [isLoadingInput, setIsLoadingInput] = useState(false);
  // const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const getLabelByType = (type: string) => {
    switch (type) {
      case "AGE":
        return "ANSV";
      case "SIC":
        return "SICOV";
      case "REC":
        return "Recaudo";
      default:
        return type;
    }
  };

  const fetchClientData = async (documentNumber: string, documentType: string) => {
    if (documentNumber && documentType) {
      try {
        setIsLoadingInput(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        const { success, data } = await GetClients({ doc_number: documentNumber, doc_type: documentType });
        const clientData: any = data || null;
        if (!success) {
          return;
        }
        if (data) {
          formik2.setFieldValue("name", clientData?.name || "");
          formik2.setFieldValue("lastName", clientData?.last_name || "");
          formik2.setFieldValue("address", clientData?.address || "");
          formik2.setFieldValue("phone", clientData?.phone || "");
          formik2.setFieldValue("email", clientData?.email || "");
        } else {
          formik2.setFieldValue("name", "");
          formik2.setFieldValue("lastName", "");
          formik2.setFieldValue("address", "");
          formik2.setFieldValue("phone", "");
          formik2.setFieldValue("email", "");
        }

      } catch (error) {
        console.error('Error fetching client data:', error);
      } finally {
        setIsLoadingInput(false);
      }
    }
  };

  const clientFetchDebounced = useMemo(
    () => debounce(fetchClientData, 1200),
    []
  );

  useEffect(() => {
    const { documentNumber, documentType } = formik2.values;
    clientFetchDebounced(documentNumber, documentType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik2.values.documentNumber, formik2.values.documentType]);

  return (
    <>
      <form onSubmit={formik2.handleSubmit}>
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid
            size={{
              xs: 12,
              sm: 12,
              md: 6,
            }}

          >
            <Typography mb={2} sx={{ color: "paynetDarkGray.main" }}>
              Información del cliente
            </Typography>
            <Box mb={3}>
              <CustomSelect
                returnProperty="id"
                id="documentType"
                name="documentType"
                onBlur={formik2.handleBlur}
                label="Tipo de documento"
                update={formik2.values.documentType || ""}
                onInputChanged={(value: string) => {
                  formik2.setFieldValue("documentType", value);
                }}
                items={mappedDocuments}
                required
              />
              {formik2.touched.documentType && formik2.errors.documentType && (
                <FormHelperText error>
                  {(formik2.errors as any).documentType}
                </FormHelperText>
              )}
            </Box>
            <Box sx={{ mb: 3 }}>
              <CustomInput
                id="documentNumber"
                label="Número de documento"
                name="documentNumber"
                value={formik2.values.documentNumber || ""}
                isLoading={isLoadingInput}
                onChange={formik2.handleChange}
                onBlur={formik2.handleBlur}
                required
              />
              {formik2.touched.documentNumber &&
                formik2.errors.documentNumber && (
                  <FormHelperText error>
                    {(formik2.errors as any).documentNumber}
                  </FormHelperText>
                )}
            </Box>
            <Box sx={{ mb: 3 }}>
              <CustomInput
                id="name"
                label="Nombres"
                name="name"
                value={formik2.values.name || ""}
                onChange={formik2.handleChange}
                onBlur={formik2.handleBlur}
                error={!!(formik2.touched.name && formik2.errors.name)}
                helperText={
                  formik2.touched.name && formik2.errors.name
                    ? formik2.errors.name
                    : null
                }
                required
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <CustomInput
                id="lastName"
                label="Apellidos"
                name="lastName"
                value={formik2.values.lastName || ""}
                onChange={formik2.handleChange}
                onBlur={formik2.handleBlur}
                error={!!(formik2.touched.lastName && formik2.errors.lastName)}
                helperText={
                  formik2.touched.lastName && formik2.errors.lastName
                    ? formik2.errors.lastName
                    : null
                }
                required
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <CustomInput
                id="address"
                label="Dirección"
                name="address"
                value={formik2.values.address || ""}
                onChange={formik2.handleChange}
                onBlur={formik2.handleBlur}
                error={!!(formik2.touched.address && formik2.errors.address)}
                helperText={
                  formik2.touched.address && formik2.errors.address
                    ? formik2.errors.address
                    : null
                }
                required
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <CustomInput
                id="phone"
                label="Teléfono"
                name="phone"
                value={formik2.values.phone || ""}
                onChange={formik2.handleChange}
                onBlur={formik2.handleBlur}
                error={!!(formik2.touched.phone && formik2.errors.phone)}
                helperText={
                  formik2.touched.phone && formik2.errors.phone
                    ? formik2.errors.phone
                    : null
                }
                required
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <CustomInput
                id="email"
                label="Correo"
                name="email"
                value={formik2.values.email || ""}
                onChange={formik2.handleChange}
                onBlur={formik2.handleBlur}
                error={!!(formik2.touched.email && formik2.errors.email)}
                helperText={
                  formik2.touched.email && formik2.errors.email
                    ? formik2.errors.email
                    : null
                }
                required
              />
            </Box>
          </Grid>

          <Grid
            size={{
              sm: 12,
              md: 6,
              xs: 12,
            }}
          >
            <Grid
              size={12}
              display="flex"
              justifyContent="flex-end"
              alignItems="start"
            >
              <Card
                sx={{
                  maxWidth: 350,
                  width: "100%",
                  backgroundColor: "white",
                  height: "auto",
                }}
              >
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    Valor de liquidación
                  </Typography>
                  <Divider sx={{ my: 2 }} />

                  {isLoadingCard ? <Grid container mb={1} spacing={1}>
                    {[...Array(3)].map((_, idx) => (
                      <Grid
                        container
                        size={12}
                        key={idx}
                        justifyContent="space-between"
                        alignItems="center"
                        mt={1}
                      >
                        <Skeleton variant="text" width="60%" height={20} />
                        <Skeleton variant="text" width="30%" height={20} />
                      </Grid>
                    ))}
                  </Grid> : cardValues.map((item: any, index: number) => (
                    <Grid
                      container
                      key={index}
                      justifyContent="space-between"
                      mt={1}
                    >
                      <Typography variant="body2">
                        {getLabelByType(item.type || item.label)}
                      </Typography>
                      <Typography variant="body2">{`${formatValueToDecimals(
                        item.chargeValue || item.value
                      )}`}</Typography>
                    </Grid>
                  ))}
                  <Divider sx={{ my: 2 }} />
                  <Grid container justifyContent="space-between">
                    <Typography variant="body1" fontWeight="bold">
                      Total
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {isLoadingCard ? <CircularProgress size={20} /> : `${formatValueToDecimals(cardValues.reduce((acc: number, item: any) => acc + item.chargeValue, 0))}`}
                    </Typography>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <CustomButton
              content="Volver"
              onClick={() => {

                handleBack(0);
              }}
              variant="outlined"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <CustomButton
              type="submit"
              content="Continuar"

            />
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default LiquidationStep;
