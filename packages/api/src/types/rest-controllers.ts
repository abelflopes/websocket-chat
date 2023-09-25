import type { paths } from "./openapi";
import type { Request, Response } from "express-serve-static-core";

export interface GenericApiResponse<T> {
  status: number;
  data: T;
}

export interface GenericApiRoute<T> {
  endpoint: `/${string}` | "*";
  method: "get" | "post" | "put" | "delete";
  action:
    | ((request: Request, response: Response) => GenericApiResponse<T>)
    | ((
        request: Request,
        response: Response
      ) => Promise<GenericApiResponse<T>>);
}

interface OpenApiModuleResponse {
  responses: Record<
    any,
    {
      content: {
        "application/json": object;
      };
    }
  >;
}

export interface ApiResponse<T extends keyof paths, M extends keyof paths[T]> {
  status: paths[T][M] extends OpenApiModuleResponse
    ? keyof paths[T][M]["responses"]
    : 0;
  data: paths[T][M] extends OpenApiModuleResponse
    ? paths[T][M]["responses"][ApiResponse<
        T,
        M
      >["status"]]["content"]["application/json"]
    : unknown;
}

export interface ApiRoute<P extends keyof paths> {
  endpoint: P;
  method: keyof paths[P];
  action:
    | ((request: Request, response: Response) => ApiResponse<P, keyof paths[P]>)
    | ((
        request: Request,
        response: Response
      ) => Promise<ApiResponse<P, keyof paths[P]>>);
}
