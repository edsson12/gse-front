import { StepperPaynetProps } from "@/interfaces/interfaces";
import { Box, Step, StepContent, Stepper, StepLabel } from "@mui/material";

const StepperPaynet: React.FC<StepperPaynetProps> = ({ steps, activeStep }) => {
  const styles = {
    "&.MuiStepper-root": {
      maxWidth: "800px",
      ".MuiStepIcon-root": {
        color: "#EA0029",
      },
      ".MuiStepLabel-label": {
        fontWeight: "700",
        fontFamily: "Mulish, sans-serif",
      },
    },
  };

  return (
    <Stepper sx={styles} activeStep={activeStep} orientation="vertical">
      {steps.map((step, index) => (
        <Step key={index} expanded={step.expanded}>
          <StepLabel>{step.label}</StepLabel>
          <StepContent>
            <Box mt={2} mb={2}>
              {step.content}
            </Box>
          </StepContent>
        </Step>
      ))}
    </Stepper>
  );
};

export default StepperPaynet;
