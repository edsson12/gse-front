
export interface DefaultResponse<T> {
  data: T | CommonErrorDTO;
  statusCode: number;
  statusDescription: string;
  statusMessage: string;
  headers: any;
}

export interface CommonError {
  [x: string]: string;
}

export interface CommonErrorDTO {
  errors: CommonError;
  error?: CommonError;
}

export interface CommonDTO<T> {
  success: boolean;
  data: T | CommonErrorDTO;
  code: number;
  description: string;
  message: string;
  statusMessage: string;
  headers: any;
}
