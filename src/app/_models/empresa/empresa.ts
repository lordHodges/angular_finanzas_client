import { Sucursal } from '../sucursales/sucursal';

export class Empresa {
  id: number;
  razonSocial: string;
  rut: string;
  descripcion: string;
  giro: string;
  actividad: string;
  direccion: string;
  Sucursals: Sucursal[];
}
