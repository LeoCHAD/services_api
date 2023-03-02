export enum ResponseQCuenta {
  NOT_FOUND = 'Cuenta no encontrada: la cuenta no está registrada en el repositorio',
  ALREADY_EXIST = 'Cuenta existente: la cuenta ya está registrada en el repositorio',
  NOT_ACCESS = 'Acceso denegado a cuenta: la cuneta no tiene con los permisos suficiente',
  OUT_OF_TIME ='Cuenta fuera de tiempo: la cuenta no está dentro de los tiempos de atención del negocio',
  ERROR = 'Error en proceso de cuenta: peticiones o comprobaciones fallidas',
}

export enum ResponseQTurno {
  NOT_FOUND = 'Turno no encontrado: el turno no está registrado en el repositorio',
  OUT_OF_TIME ='Turno fuera de tiempo: el turno no está dentro de los tiempos de atención del negocio',
  ERROR = 'Error en proceso de turno: peticiones o comprobaciones fallidas',
}

export enum ResponseQCliente {
  NOT_FOUND = 'Cliente no encontrado: el cliente no está registrado en el repositorio',
  ALREADY_EXIST = 'Cliente existente: el cliente ya está registrada en el repositorio',
  OUT_OF_TIME ='Cliente fuera de tiempo: el cliente no está dentro de los tiempos de atención del negocio',
  ERROR = 'Error en proceso de cliente: peticiones o comprobaciones fallidas',
}

export enum ResponseQClienteDeNegocio {
  NOT_FOUND = 'Cliente de negocio no encontrado: el cliente de negocio no está registrado en el repositorio',
  ALREADY_EXIST = 'Cliente de negocio existente: el cliente de negocio ya está registrada en el repositorio',
  OUT_OF_TIME ='Cliente de negocio fuera de tiempo: el cliente de negocio no está dentro de los tiempos de atención del negocio',
  ERROR = 'Error en proceso de cliente de negocio: peticiones o comprobaciones fallidas',
}

export enum ResponseQListaDeEspera {
  NOT_FOUND = 'Lista de espera no encontrada: la lista de espera no está registrada en el repositorio',
  OUT_OF_TIME ='Lista de espera de tiempo: la lista de espera no está dentro de los tiempos de atención del negocio',
  ALREADY_EXIST = 'Lista de espera existente: la lista de espera ya está registrada en el repositorio',
  IS_EMPTY = 'Lista de espera vacía: la lista de espera consultada se encuentra vacía',
  ERROR = 'Error en proceso de lista de espera: peticiones o comprobaciones fallidas',
}

export enum ResponseQNotificacion {
  NOT_FOUND = 'Notifiacion no encontrada: la Notifiacion espera no está registrada en el repositorio',
  OUT_OF_TIME ='Notificacion de tiempo: la Notifiacion no está dentro de los tiempos de atención del negocio',
  ERROR = 'Error en proceso de Notifiacion: peticiones o comprobaciones fallidas',
}

export enum ResponseQDescuento {
  NOT_FOUND = 'Descuento no encontrado: el descuento espera no está registrado en el repositorio',
  OUT_OF_TIME ='Descuento fuera de tiempo: el descuento no está dentro de los tiempos de atención del negocio',
  ALREADY_EXIST = 'Descuento existente: el descuento ya está registrada en el repositorio',
  ERROR = 'Error en proceso de descuento: peticiones o comprobaciones fallidas',
}