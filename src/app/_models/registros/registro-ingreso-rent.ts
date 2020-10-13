import { Registro } from './registro';

export class RegistroIngresoRent extends Registro {
  ppu: string;
  marca: string;
  modelo: string;
  cantidadDias: number;
  empresaCopago: string;
  cliente: string;
}
