import type {ZodTypeAny} from 'zod';

export async function defaultFetch<R = unknown>(input: RequestInfo | URL, init?: RequestInit | undefined) {
  const response = await fetch(input, init);
  return response.json() as R;
}

export function safe<M extends AnyMethod>(method: M): Safe<M> {
  return (schema) =>
    async (...args) => {
      const dto = await method(...args);
      return schema.parseAsync(dto);
    };
}

// TYPES ===================================================================================================================================
export type AnyFetch = (...args: any[]) => Promise<Response>;
export type AnyMethod = (...args: any[]) => Promise<unknown>;
export type Safe<M extends AnyMethod> = <S extends ZodTypeAny>(schema: S) => (...args: Parameters<M>) => Promise<S['_output']>;
