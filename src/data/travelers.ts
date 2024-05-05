import data from "./data.json";
import { Hotel } from "./hotels";
import { Genre } from "./ticketmaster";
import { City } from "./travelperks";

type Traveler = {
  id: number;
  name: string;
  departureCity: City;
  arrivalCity: City;
  hotel: Hotel;
  interests: Genre[];
};

export const TRAVELERS = data as Traveler[];
