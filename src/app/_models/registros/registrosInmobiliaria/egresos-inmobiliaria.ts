import { RespaldoEgreso } from '@app/_models/respaldo-egreso';
import { Registro } from '../registro';
export class EgresosInmobiliaria {
  id: number;
  propiedad: string;
  tipoEgreso: string;
  fecha: string;
  monto: number;
  responsable: string;
  descripcion: string;
  idSucursal: number;
  idUsuario: number;
  RespaldoEgresoInmobiliaria: any[];
}
