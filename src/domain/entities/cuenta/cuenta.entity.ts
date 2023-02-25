import { compare } from "bcryptjs";
import { EntityBase } from "../../shared/entities/entityBase";
import { Guid } from "../../shared/services/Guid";

export class Cuenta extends EntityBase {
  private userName: string;
  private password: string;

  constructor(userName: string, password: string) {
    super(new Guid());
    this.userName = userName;
    this.password = password;
  }
  get user(){
    return this.userName
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