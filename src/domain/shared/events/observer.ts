import { EventBase } from "./eventBase";

export interface Observer{
  notify: (event: EventBase)=>void;
}