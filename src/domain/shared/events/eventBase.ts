import { Guid } from "../services/Guid";
export interface EventBody{
  title: string;
  data: any
}
export interface EventBase{
  owner:Guid;
  body: EventBody;
}