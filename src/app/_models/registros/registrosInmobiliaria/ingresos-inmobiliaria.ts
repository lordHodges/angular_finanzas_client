import { User } from '@app/_models/users/user';
import { Sucursal } from '@app/_models/sucursales/sucursal';
export class IngresosInmobiliaria {
  id: string;
  propiedad: string;
  fecha: string;
  monto: number;
  idSucursal: number;
  idUsuario: number;
  tipoIngreso: string;
  descripcionIngreso: string;
  Sucursal: Sucursal[];
  Usuario: User[];
  RespaldoIngresoInmobiliaria: any[];
}