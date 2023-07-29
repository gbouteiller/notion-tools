import {transform} from 'valibot';
import {vIPage} from './inputs';

export const vPage = transform(vIPage, ({created_by, created_time, last_edited_by, last_edited_time}) => {
  return {created: {at: created_time, by: created_by.id}, updated: {at: last_edited_time, by: last_edited_by.id}};
});
