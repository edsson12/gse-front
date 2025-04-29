export interface StepProps {
  label: string;
  content: React.ReactNode;
  expanded?: boolean;
}

export interface StepperPaynetProps {
  steps: StepProps[];
  activeStep: number;
}
export interface IDocument {
  _id: string;
  name: string;
  type: string;
  createdAt: string;
  updateAt: string;
  __v: number;
}

export interface IServices {
  _id: string;
  name: string;
  createdAt: string;
  updateAt: string;
  __v: number;
}

export interface IVehicleTypes {
  _id: string;
  name: string;
  createdAt: string;
  updateAt: string;
  __v: number;
}