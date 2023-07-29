import {array, merge, object, omit, transform, type BaseSchema} from 'valibot';
import {vIListSearchPageOrDatabase} from './inputs';

export function vDatabaseList<T extends BaseSchema>(vItem: T) {
  return transform(
    merge([omit(vIListSearchPageOrDatabase, ['object', 'page_or_database', 'type']), object({results: array(vItem)})]),
    ({has_more: hasMore, next_cursor, results}) => ({hasMore, cursor: next_cursor ?? undefined, results})
  );
}
