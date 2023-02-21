import { Disponibilidad } from "../disponibilidad/disponibilidad";

export interface Servicio{
  price: number;
  disponibilidad: Disponibilidad;
  category: string;
  img: string;
  description: string;
}