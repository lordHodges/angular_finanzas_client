import { RespaldoEgreso } from '@app/_models/respaldo-egreso';
import { Registro } from '../registro';

export class EgresosLubricentro {
    id: number;
    tipoEgreso: string;
    fecha: string;
    monto: number;
    responsable: string;
    descripcion: string;
    idSucursal: number;
    idUsuario: number;
    RespaldoEgresoLubricentros: any[];
}
