import type {
  ListSearchDatabase as NListSearchDatabase,
  ListSearchPage as NListSearchPage,
  ListSearchPageorDatabaseAny as NListSearchPageorDatabaseAny,
} from '../schemas/input';
import {listCommonFrom} from './common';
import {databaseFrom} from './database';
import {pageFrom} from './page';

export function listDatabaseFromSearch({page_or_database: _, results, type: __, ...r}: NListSearchDatabase) {
  return listCommonFrom({results: results.map(databaseFrom), ...r});
}

export function listPageFromSearch({page_or_database: _, results, type: __, ...r}: NListSearchPage) {
  return listCommonFrom({...r, results: results.map(pageFrom)});
}

export function listPageOrDatabaseFromSearch({page_or_database: _, results, type: __, ...r}: NListSearchPageorDatabaseAny) {
  return listCommonFrom({results: results.map((res) => (res.object === 'database' ? databaseFrom(res) : pageFrom(res))), ...r});
}
