import type {ZodTypeAny} from 'zod';
import {listCommonFrom} from '../utils';
import {zListSearchPageOrDatabase as zIListSearchPageOrDatabase} from './input';

export function zDatabaseList<R extends ZodTypeAny>(zResult: R) {
  return zIListSearchPageOrDatabase(zResult).omit({type: true, page_or_database: true}).transform(listCommonFrom);
}

export function zDatabaseItems<I extends ZodTypeAny>(zItem: I) {
  return zDatabaseList(zItem).transform(({results}) => results);
}
