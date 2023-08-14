import type {FindBlockChildrenParams, FindDatabaseItemsParams, FindPageParams} from '../schemas';
import type {ListBlock, ListPageAny} from '../schemas/input';
import {listQueryFrom} from '../utils';
import {defaultFetch, safe} from './utils';

// INSTANTIATION ===========================================================================================================================
export function createNotion({auth, baseUrl = 'https://api.notion.com/v1', fetch = defaultFetch, version}: CreateNotionP) {
  const headers = {Authorization: `Bearer ${auth}`, 'Notion-Version': version ?? '2022-06-28', 'Content-Type': 'application/json'};

  // BLOCK =================================================================================================================================
  function unsafeFindBlockChildren(params: FindBlockChildrenParams) {
    return fetch<ListBlock>(`${baseUrl}/blocks/${params.id}/children${listQueryFrom(params)}`, {headers});
  }
  const findBlockChildren = safe(unsafeFindBlockChildren);

  // DATABASE ==============================================================================================================================
  function unsafeFindDatabaseItems(params: FindDatabaseItemsParams) {
    return fetch<ListPageAny>(`${baseUrl}/databases/${params.id}/query${listQueryFrom(params)}#${params.id}`, {headers, method: 'POST'});
  }
  const findDatabaseItems = safe(unsafeFindDatabaseItems);

  // PAGE ==================================================================================================================================
  function unsafeFindPage(params: FindPageParams) {
    return fetch(`${baseUrl}/pages/${params.id}`, {headers});
  }
  const findPage = safe(unsafeFindPage);

  return {
    findBlockChildren,
    findDatabaseItems,
    findPage,
    unsafeFindBlockChildren,
    unsafeFindDatabaseItems,
    unsafeFindPage,
  };
}

// TYPES ===================================================================================================================================
export type CreateNotionP = {
  auth?: string;
  baseUrl?: string;
  fetch?: <R>(input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<R>;
  version?: string;
};
