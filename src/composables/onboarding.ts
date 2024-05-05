import * as yup from "yup";
import { CITIES } from "../data/travelperks";

export const personalInfoSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
});

export type PersonalInfoForm = yup.InferType<typeof personalInfoSchema>;

export const travelDetailsSchema = yup.object().shape({
  departureCity: yup.string().oneOf(CITIES).required(),
  arrivalCity: yup.string().oneOf(CITIES).required(),
  arrivalDate: yup.date().required(),
  departureDate: yup.date().required(),
});

export type TravelDetailsForm = yup.InferType<typeof travelDetailsSchema>;
