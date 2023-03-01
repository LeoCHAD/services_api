export class Time{
  days: number;
  hours: number;
  minutes: number;
  seconds: number;

  constructor(miliseconds: number){
    // Cálculo de días, horas, minutos y segundos
    const seconds = Math.floor(miliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    // Cálculo de horas y minutos restantes
    const remainingHours = hours % 24;
    const remainingMinutes = minutes % 60;
    const remainingSeconds = seconds % 60;
    this.days = days
    this.hours = remainingHours
    this.minutes = remainingMinutes
    this.seconds = remainingSeconds
  }
  /**
   * Determina el tiempo actual en el que se llama la función
   * @returns 
   */
  public static getLocalTime = (): Time => {
    const now = new Date();
    const offset = -5 * 60; // offset necesario para cincronizar con nuestro país Colombia
    const localTime = now.setHours(now.getHours() + offset / 60, now.getMinutes() + offset % 60);
    return new Time(localTime);
  };
    /**
   * Verifica que la hora se encuentre entre las 8:00 y las 18:30
   * ya que el negocio solo presta sus serviciso en esos tiempos
   * @returns 
   */
    public static isOnTimeVerify = (): boolean => {
      const now = Time.getLocalTime();
      if (now.hours >= 8 && now.hours < 18) {
        return true
      } else if (now.hours == 18 && now.minutes < 30) {
        return false
      }else{
        return false
      }
    };
}
