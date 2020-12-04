import { User } from '@app/_models/users/user';
import { Sucursal } from '@app/_models/sucursales/sucursal';
export class CostoLubricentro {
    id: number;
    idSucursal: number;
    idUsuario: number;
    RespaldoCostoLubricentros: any[];
    idIngreso: number;
    idEgreso: number;
}