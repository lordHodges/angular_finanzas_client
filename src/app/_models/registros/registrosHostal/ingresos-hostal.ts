import { Registro } from '../registro';
import { User } from '@app/_models/users/user';
import { Sucursal } from '@app/_models/sucursales/sucursal';
export class IngresosHostal extends Registro {
  estadoPago: string;
  tipoPago: string;
  tipoCliente: string;
  cliente: string;
  tipoIngreso: string;
  Sucursal: Sucursal[];
  Usuario: User[];
}
