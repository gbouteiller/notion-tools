import {array, enumType, literal, merge, object, union} from 'valibot';
import {vIListCommon} from './common';
import {vIDatabase} from './database';
import {vIPage} from './page';

// FILTER ==================================================================================================================================
export const searchFilterObjects = ['database', 'page'] as const;
export const vISearchFilterObject = enumType(searchFilterObjects);
export const SEARCH_FILTER_OBJECT = vISearchFilterObject.enum;

export const vISearchFilter = object({
  property: literal('object'),
  value: vISearchFilterObject,
});

// SORT ====================================================================================================================================
export const searchSortDirections = ['ascending', 'descending'] as const;
export const vISearchSortDirection = enumType(searchSortDirections);
export const SEARCH_SORT_DIRECTION = vISearchSortDirection.enum;

export const vISearchSort = object({
  direction: vISearchSortDirection,
  timestamp: literal('last_edited_time'),
});

// LIST =================================================================================================================================
export const vIListSearchPageOrDatabase = merge([
  vIListCommon,
  object({
    page_or_database: object({}),
    results: array(union([vIDatabase, vIPage])),
    type: literal('page_or_database'),
  }),
]);

export const vIListSearchDatabase = merge([
  vIListSearchPageOrDatabase,
  object({
    results: array(vIDatabase),
  }),
]);

export const vIListSearchPage = merge([
  vIListSearchPageOrDatabase,
  object({
    results: array(vIPage),
  }),
]);

export const vIListSearch = union([vIListSearchDatabase, vIListSearchPage, vIListSearchPageOrDatabase]);
