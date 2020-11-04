import { CuotasCausa } from './cuotasCausa';

export class Causa {
  id: string;
  codigo: string;
  titulo: string;
  materia: string;
  estado: string;
  montoCausa: number;
  saldoPendiente: number;
  idSucursal: string;
  idUsuario: string;
  idCliente: string;
  CuotasCausas: CuotasCausa[];
}
