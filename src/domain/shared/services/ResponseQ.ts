export enum ResponseQCuenta {
  NOT_FOUND = 'Cuenta no encontrada: la cuenta no está registrada en el repositorio',
  NOT_ACCESS = 'Acceso denegado a cuenta: la cuneta no tiene con los permisos suficiente',
  OUT_OF_TIME ='Cuenta fuera de tiempo: la cuenta no está dentro de los tiempos de atención',
  ERROR = 'Error en proceso de cuenta: peticiones o comprobaciones fallidas',
}

export enum ResponseQTurno {
  NOT_FOUND = 'Turno no encontrado',
  NOT_ACCESS = 'Acceso denegado a turno',
  OUT_OF_TIME ='Turno fuera de tiempo',
  ERROR = 'Error en proceso de turno',

}