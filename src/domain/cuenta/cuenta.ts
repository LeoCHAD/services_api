export interface Cuenta {
  id: string;
  userName: string;
  password: string;
  name: string;
  email: string;

  startSession(): boolean;
  finishSession(): boolean;
  create(): Cuenta;
  delete(): boolean;
  edit(data: Cuenta): Cuenta;
}