import type { IncomingMessage, ServerResponse } from "http";

export type Req = IncomingMessage;
export type Res = ServerResponse;

export interface Order {
  id: string;
  customer: string;
  quantity: number;
  food: string;
  price: number;
}
