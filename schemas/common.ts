import {merge, nullable, object, string, transform} from 'valibot';
import {vICommon, vIFile, vIIcon} from './inputs';

export const vCommon = transform(vICommon, ({created_by, created_time, last_edited_by, last_edited_time, ...r}) => ({
  created: {at: created_time, by: created_by.id},
  updated: {at: last_edited_time, by: last_edited_by.id},
  ...r,
}));

export const vPageOrDatabaseCommon = merge([
  vCommon,
  object({
    cover: nullable(vIFile),
    icon: nullable(vIIcon),
    url: string(),
  }),
]);
