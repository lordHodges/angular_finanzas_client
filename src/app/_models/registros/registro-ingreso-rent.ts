import { RegistroIngreso } from './registroIngreso';

export class RegistroIngresoRent extends RegistroIngreso {
  patente: string;
  marca: string;
  modelo: string;
  cantidadDias: number;
  empresaCopago: string;
}
