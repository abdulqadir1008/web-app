import axios from "axios";
import { getCookie } from "../components/Cookies";
import ErrorValidation from "./ErrorHandling";

export const resolvePostApi = async (URL: string, query: string) => {
  try {
    const {data: { data:response, errors }} = await axios.post(URL, { query });
    if (!response) {
      ErrorValidation(errors);
    }
    return response;
  } catch ({message}:any) {
   throw {message}
  }
};
export const resolvePostApiWithHeaders = async (URL: string, query: string,Token:any) => {
  const config = { headers: { Authorization: `Bearer ${Token}` } };
  const {
    data: { data:response, errors }
  } = await axios.post(URL, { query },config);

  if (!response) {
    console.log(errors)
    ErrorValidation(errors);
  }
  return  response ;
 
};