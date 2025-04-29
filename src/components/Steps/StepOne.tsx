
import { FormControlLabel, FormHelperText, Grid, Radio, RadioGroup } from "@mui/material";
import CustomSelect from "../CustomSelect";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import { IDocument, IServices, IVehicleTypes } from "@/interfaces/interfaces";
import { DatePicker, YearCalendar } from "@mui/x-date-pickers";
import { DateTime } from "luxon";

interface GeneralInformationStepProps {
  formik: any;
  activeStep: number;
  handleNext: (step: number) => void;
  handleBack: (step: number) => void;
  services: IServices[];
  vehicleTypes: IVehicleTypes[];
}

const GeneralInformationStep = ({
  formik,
  activeStep,
  handleNext,
  handleBack,
  services,
  vehicleTypes,
}: GeneralInformationStepProps) => {

  const mappedServices = services?.map((item) => {
    return { id: item._id, name: item.name };
  })
  const mappedVehicleTypes = vehicleTypes?.map((item) => {
    return { id: item._id, name: item.name };
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} alignItems={"end"}>

          <Grid size={4}>
            <CustomInput
              id="placa"
              label="Placa"
              name="placa"
              onBlur={formik.handleBlur}
              onChange={(value) => {
                formik.setFieldValue("placa", value.target.value.toUpperCase());
              }}
              type="text"
              value={formik.values.placa || ""}
              required
            />
            {formik.touched.placa && formik.errors.placa && (
              <FormHelperText error>
                {(formik.errors as any).placa}
              </FormHelperText>
            )}
          </Grid>
          <Grid size={4}>
            <CustomInput
              id="inp-placa-confirm"
              label="Confirmación de placa"
              name="placaConfirm"
              onBlur={formik.handleBlur}
              onChange={(value) => {
                formik.setFieldValue(
                  "placaConfirm",
                  value.target.value.toUpperCase()
                );
              }}
              type="text"
              value={formik.values.placaConfirm || ""}
              //   isLoading={isLoadingInput}
              required
            />
            {formik.touched.placaConfirm && formik.errors.placaConfirm && (
              <FormHelperText error>
                {(formik.errors as any).placaConfirm}
              </FormHelperText>
            )}
          </Grid>
          <Grid size={4}>
            <Grid size={4}>
              <DatePicker
                label="Modelo"
                views={['year']}
                openTo="year"
                value={formik.values.model ? DateTime.fromObject({ year: Number(formik.values.model) }) : null}
                onChange={(value: DateTime | null) => {
                  formik.setFieldValue("model", value ? value.year : "");
                }}
                maxDate={DateTime.now()}
                slotProps={{
                  textField: {
                    size: "small",
                    variant: "filled",
                    sx: {
                      background: "white", borderRadius: "5px",
                      "& .MuiPickersInputBase-root": {
                        background: "white",
                        borderRadius: "5px",
                      },

                    },
                  }
                }}
              />

            </Grid>
            {formik.touched.model && formik.errors.model && (
              <FormHelperText error>
                {(formik.errors as any).model}
              </FormHelperText>
            )}
          </Grid>
          <Grid size={4}>
            <CustomSelect
              returnProperty="name"
              label="Tipo de vehículo"
              id="vehicleType"
              name="vehicleType"
              update={formik.values.vehicleType || ""}
              onInputChanged={(value: object) => {
                formik.setFieldValue("vehicleType", value);
              }}
              items={mappedVehicleTypes}
              required
            />
            {formik.errors.vehicleType && formik.touched.vehicleType && (
              <FormHelperText error>
                {(formik.errors as any).vehicleType}
              </FormHelperText>
            )}
          </Grid>

          <Grid size={4}>
            <CustomSelect
              returnProperty="name"
              label="Servicio"
              id="typeServices_Id"
              name="typeServices_Id"
              update={formik.values.typeServices_Id || ""}
              onInputChanged={(value: object) => {
                formik.setFieldValue("typeServices_Id", value);
              }}
              items={mappedServices}
              required
            />
            {formik.errors.typeServices_Id &&
              formik.touched.typeServices_Id && (
                <FormHelperText error>
                  {(formik.errors as any).typeServices_Id}
                </FormHelperText>
              )}
          </Grid>
          <Grid size={12}>
            <FormHelperText sx={{ mb: 1, }}>Forma de pago</FormHelperText>
            <RadioGroup
              row
              name="paymentMethod"
              value={formik.values.paymentMethod || ""}
              onChange={(e) => formik.setFieldValue("paymentMethod", e.target.value)}
            >
              <FormControlLabel
                value="tioPaco"
                control={<Radio />}
                label="Tío Paco"
              />
              <FormControlLabel
                value="deContado"
                control={<Radio />}
                label="De contado"
              />
            </RadioGroup>
            {formik.touched.paymentMethod && formik.errors.paymentMethod && (
              <FormHelperText error>
                {(formik.errors as any).paymentMethod}
              </FormHelperText>
            )}
          </Grid>
          <Grid container size={12}>
            <Grid size={4}>
              {activeStep <= 0 && (
                <CustomButton
                  content="Limpiar"
                  onClick={() => {
                    formik.resetForm();
                  }}
                  variant="outlined"
                />
              )}
            </Grid>

            <Grid size={4}>
              <CustomButton
                type="submit"
                content="Consultar"
              //   isLoadingButton={isLoadingInput}
              />
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default GeneralInformationStep;
