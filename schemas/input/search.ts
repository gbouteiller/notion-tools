import {z, type ZodTypeAny} from 'zod';
import {zListCommon} from './common';
import {zDatabase} from './database';
import {zPageAny} from './page';

// FILTER ==================================================================================================================================
export const searchFilterObjects = ['database', 'page'] as const;
export const zSearchFilterObject = z.enum(searchFilterObjects);
export const SEARCH_FILTER_OBJECT = zSearchFilterObject.enum;

export const zSearchFilter = z.object({
  property: z.literal('object'),
  value: zSearchFilterObject,
});

// SORT ====================================================================================================================================
export const searchSortDirections = ['ascending', 'descending'] as const;
export const zSearchSortDirection = z.enum(searchSortDirections);
export const SEARCH_SORT_DIRECTION = zSearchSortDirection.enum;

export const zSearchSort = z.object({
  direction: zSearchSortDirection,
  timestamp: z.literal('last_edited_time'),
});

// LIST =================================================================================================================================
export const zListSearchPageOrDatabaseAny = z.object({
  ...zListCommon.shape,
  page_or_database: z.object({}),
  results: z.union([zDatabase, zPageAny]).array(),
  type: z.literal('page_or_database'),
});
export type ListSearchPageorDatabaseAny = z.infer<typeof zListSearchPageOrDatabaseAny>;

export function zListSearchPageOrDatabase<R extends ZodTypeAny>(zResult: R) {
  return z.object({...zListSearchPageOrDatabaseAny.shape, results: zResult.array()});
}

export const zListSearchDatabase = z.object({
  ...zListSearchPageOrDatabaseAny.shape,
  results: zDatabase.array(),
});
export type ListSearchDatabase = z.infer<typeof zListSearchDatabase>;

export const zListSearchPage = z.object({
  ...zListSearchPageOrDatabaseAny.shape,
  results: zPageAny.array(),
});
export type ListSearchPage = z.infer<typeof zListSearchPage>;

export const zListSearch = z.union([zListSearchDatabase, zListSearchPage, zListSearchPageOrDatabaseAny]);
export type ListSearch = z.infer<typeof zListSearch>;
