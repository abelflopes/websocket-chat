import fs from "node:fs";
import path from "node:path";
import type { GenericApiRoute } from "../types/rest-controllers";

export const notFound: GenericApiRoute<string> = {
  endpoint: "/",
  method: "get",
  action: () => {
    const htmlFile = path.resolve(process.cwd(), "./dist/docs/index.html");

    let status;
    let data;

    try {
      data = fs.readFileSync(htmlFile, {
        encoding: "utf8",
      });
      status = 200;
    } catch (error) {
      data = error instanceof Error ? error.message : String(error);
      status = 400;
    }

    return {
      status,
      data,
    };
  },
};
