import { User } from '@app/_models/users/user';
import { Sucursal } from '@app/_models/sucursales/sucursal';
export class IngresosLubricentro{
    id: string;
    fecha: string;
    monto: number;
    idSucursal: number;
    idUsuario: number;
    estadoPago: string;
    tipoPago: string;
    tipoCliente: string;
    cliente: string;
    telefono: string;
    correo: string;
    tipoVehiculo: string;
    ppu: string;
    marca: string;
    modelo: string;
    anio: number;
    kmActual: number;
    kmProximo: string;
    referenciaCliente: string;
    tipoIngreso: string;
    nDocumento: string;
    descripcionIngreso: string;
    nAutorizacion: string;
    banco: string;
    Sucursal: Sucursal[];
    Usuario: User[];
    RespaldoIngresoLubricentros: any[];
    idEgreso: number;
}
