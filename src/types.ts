import type { IncomingMessage, ServerResponse } from "http";

import data from "../db/data.json" with { type: "json" };

export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export type Req = IncomingMessage & {
  method: Method;
};
export type Res = ServerResponse;

export type Order = (typeof data)[number];

// export interface Order {
//   id: string;
//   customer: string;
//   quantity: number;
//   food: string;
//   price: number;
// }
