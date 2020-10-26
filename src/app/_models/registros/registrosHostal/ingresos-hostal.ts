import { User } from '@app/_models/users/user';
import { Sucursal } from '@app/_models/sucursales/sucursal';
export class IngresosHostal {
  id: string;
  fecha: string;
  monto: number;
  idSucursal: number;
  idUsuario: number;
  estadoPago: string;
  tipoPago: string;
  tipoCliente: string;
  cliente: string;
  tipoIngreso: string;
  nDocumento: string;
  descripcionIngreso: string;
  Sucursal: Sucursal[];
  Usuario: User[];
  RespaldoIngresos: any[];
}
