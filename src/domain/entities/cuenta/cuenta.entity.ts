import { compare } from "bcryptjs";
import { EntityBase } from "../../shared/entities/EntityBase";
import { Guid } from "../../shared/services/Guid";

export class Cuenta extends EntityBase {
  private _email: string;
  private password: string;

  constructor(id: Guid, email: string, password: string) {
    super(id);
    this._email = email;
    this.password = password;
  }
  get email(){
    return this._email
  };
  get pass(){
    return this.password
  };
  /**
   * Compara una contraseña ingresada con el hash almacenado
   * @param pass
   * @returns
   */
  public comparePassword = async (pass: string): Promise<boolean> => {
    try {
      const response = await compare(pass, this.password);
      if (!response) return true;
      else return false;
    } catch (err) {
      return false;
    }
  };
} //end class
