export class CleanService {
    public id_user: number;
    public id_service: number;
    public nombre: String;
    public apellido: String;
    public cedula: String;
    public celular: String;
    public direccion: String;
    public correo: String;
    public estado: String;
    public valor: number;
    public fecha_servicio: String;
    public nombreCategoria: String;// aseo general, limpieza de piscinas, etc
    public horario: String;// mañana o tarde
    public nColaboradores: number;//este puede cambiar por nCarros. dependiendo
    public fecha: String;//dia actual
    public tipoServicio:String;//nombre del servicio 4 horas 8 horas, jacuzzi automovil 
}