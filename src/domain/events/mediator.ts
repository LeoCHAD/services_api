import { EventBase } from "../shared/events/eventBase"; 
import { Observer } from "../shared/events/observer";

export class MediatorEvents{
  private observers: {[key: string]: Observer[]} = {};
  constructor(){}

  public subscribe = (eventName: string, observer: Observer): void => {
    if (!this.observers[eventName]) {
      this.observers[eventName] = [];
    }
    this.observers[eventName].push(observer);
  }

  public unsubscribe = (nameEvent:string, observer: Observer): void => {
    this.observers[nameEvent] = this.observers[nameEvent].filter((obs) => obs !== observer);
  }
  public publish(eventName:string, event: EventBase): void {
    this.observers[eventName].forEach((observer) => {
      observer.notify(event);
    });
  }
}