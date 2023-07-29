import {parseAsync, type BaseSchema, type Output} from 'valibot';

export function createNotion<F extends AnyFetch>({auth, baseUrl = 'https://api.notion.com/v1', fetch, version}: CreateNotionP<F>) {
  const headers = {Authorization: `Bearer ${auth}`, 'Notion-Version': version ?? '2022-06-28', 'Content-Type': 'application/json'};

  function vFetch<N extends AnyFetch>(nFetch: N): VFetch<N> {
    return (schema) =>
      async (...args) => {
        const response = await nFetch(...args);
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
        const dto = await response.json();
        return parseAsync(schema, dto);
      };
  }

  return {
    fetchDatabaseList: vFetch((id: string) => fetch(`${baseUrl}/databases/${id}/query`, {headers, method: 'POST'})),
    fetchPage: vFetch((id: string) => fetch(`${baseUrl}/pages/${id}`, {headers})),
  };
}

// TYPES ===================================================================================================================================
export type AnyFetch = (...args: any[]) => any;
export type CreateNotionP<F extends AnyFetch> = {auth?: string; baseUrl?: string; fetch: F; version?: string};
export type VFetch<N extends AnyFetch> = <S extends BaseSchema>(schema: S) => (...args: Parameters<N>) => Promise<Output<S>>;
