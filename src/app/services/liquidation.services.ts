import fetchHelper from "../api/api";

export const GetDocuments = async () => {
  const serverResponse = await fetchHelper.get(`/documents`);
  return serverResponse.data;
};
export const GetServices = async () => {
  const serverResponse = await fetchHelper.get(`/services`);
  return serverResponse.data;
};
export const GetVehicleTypes = async () => {
  const serverResponse = await fetchHelper.get(`/vehicle-type`);
  return serverResponse.data;
};
export const GetClients = async (params: any) => {
  const serverResponse = await fetchHelper.get(clientsEndpoint(params), params);
  return serverResponse;
};

export const SaveClient = async (params: any) => {
  const response = await fetchHelper.post("/clients", params);
  return response;
};

const clientsEndpoint = ({
  doc_type,
  doc_number,
}: {
  doc_type: string;
  doc_number: string;
}) => {
  return `/clients?doc_type=${doc_type}&doc_number=${doc_number}`;
};
