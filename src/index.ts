import { createServer } from "http";
import { sendResponse } from "./utility";
import { orderRoute } from "./routes/order.route";
import type { Req } from "./types";

const server = createServer(async (req, res) => {
  const url = req.url ?? "/";
  if (url === "/") {
    return sendResponse(res, { message: "Welcome to our server" }, 200);
  }
  if (url.startsWith("/order")) {
    return await orderRoute(req as Req, res);
  }
  sendResponse(res, { message: "Not found" }, 404);
});

const port = 3000;

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
