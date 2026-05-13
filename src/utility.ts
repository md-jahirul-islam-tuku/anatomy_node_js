import type { Req, Res } from "./types";

export function sendResponse<T>(
  res: Res,
  { message, data, error }: { message: string; data?: T; error?: boolean },
  status = 200,
) {
  res.writeHead(status, { "content-type": "application/json" });
  res.end(
    JSON.stringify({
      success: error ? false : true,
      message,
      data: error ? null : data,
    }),
  );
}

export const extractRequestInfo = async <T>(req: Req) => {
  const params = req.url?.split("/").filter(Boolean) ?? [];
  const body =
    req.method === "POST" || req.method === "PUT" || req.method === "PATCH"
      ? await parseBody<T>(req)
      : null;
  return {
    url: req.url ?? "/",
    method: req.method,
    params,
    body,
  };
};

const parseBody = async <T>(req: Req): Promise<T | null> => {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(body) as T);
      } catch (error) {
        reject(new Error("Invalid data"));
      }
    });
  });
};
