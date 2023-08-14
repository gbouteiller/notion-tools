import {D} from '@mobily/ts-belt';
import type {PageAny} from '../schemas';
import type {
  ListPageAny as NListPageAny,
  PageAny as NPageAny,
  PageCommon as NPageCommon,
  PageProp as NPageProp,
  PagePropPeople as NPagePropPeople,
  PagePropRelation as NPagePropRelation,
  PagePropRichText as NPagePropRichText,
  PagePropRollup as NPagePropRollup,
  PagePropTitle as NPagePropTitle
} from '../schemas/input';
import {listCommonFrom, pageOrDatabaseCommonFrom, parentFrom, richTextFrom, rollupFrom} from './common';
import {
  propCheckboxFrom,
  propCreatedByFrom,
  propCreatedTimeFrom,
  propDateFrom,
  propEmailFrom,
  propFilesFrom,
  propFormulaFrom,
  propLastEditedByFrom,
  propLastEditedTimeFrom,
  propMultiSelectFrom,
  propNumberFrom,
  propPhoneNumberFrom,
  propSelectFrom,
  propStatusFrom,
  propUrlFrom,
  type PropTitle,
} from './prop';
import {userFrom} from './user';

// PEOPLE ==================================================================================================================================
export function pagePropPeopleFrom({people, ...r}: NPagePropPeople) {
  return {...r, value: people.map(userFrom)};
}

// RELATION ================================================================================================================================
export function pagePropRelationFrom({relation, has_more: hasMore, ...r}: NPagePropRelation) {
  return {...r, hasMore, value: relation.map(({id}) => id)};
}

// RICH TEXT ===============================================================================================================================
export function pagePropRichTextFrom({rich_text, ...r}: NPagePropRichText) {
  return {...r, value: rich_text.map(richTextFrom)};
}

// ROLLUP ==================================================================================================================================
export function pagePropRollupFrom({rollup, ...r}: NPagePropRollup) {
  if (rollup.type === 'array') rollup.array = rollup.array.flatMap(pagePropFrom);
  return {...r, value: rollupFrom(rollup)};
}

// TITLE ===================================================================================================================================
export function pagePropTitleFrom({title, ...r}: NPagePropTitle) {
  return {...r, value: title.map(richTextFrom)};
}

export function getPagePropTitle({properties}: PageAny) {
  return Object.values(properties).find(({type}) => type === 'title') as PropTitle;
}

// PROP ====================================================================================================================================
export function pagePropFrom<P extends NPageProp>(nPageProp: P) {
  if (nPageProp.type === 'checkbox') return propCheckboxFrom(nPageProp);
  if (nPageProp.type === 'created_by') return propCreatedByFrom(nPageProp);
  if (nPageProp.type === 'created_time') return propCreatedTimeFrom(nPageProp);
  if (nPageProp.type === 'date') return propDateFrom(nPageProp);
  if (nPageProp.type === 'email') return propEmailFrom(nPageProp);
  if (nPageProp.type === 'files') return propFilesFrom(nPageProp);
  if (nPageProp.type === 'formula') return propFormulaFrom(nPageProp);
  if (nPageProp.type === 'last_edited_by') return propLastEditedByFrom(nPageProp);
  if (nPageProp.type === 'last_edited_time') return propLastEditedTimeFrom(nPageProp);
  if (nPageProp.type === 'multi_select') return propMultiSelectFrom(nPageProp);
  if (nPageProp.type === 'number') return propNumberFrom(nPageProp);
  if (nPageProp.type === 'people') return pagePropPeopleFrom(nPageProp);
  if (nPageProp.type === 'phone_number') return propPhoneNumberFrom(nPageProp);
  if (nPageProp.type === 'relation') return pagePropRelationFrom(nPageProp);
  if (nPageProp.type === 'rich_text') return pagePropRichTextFrom(nPageProp);
  if (nPageProp.type === 'rollup') return pagePropRollupFrom(nPageProp);
  if (nPageProp.type === 'select') return propSelectFrom(nPageProp);
  if (nPageProp.type === 'status') return propStatusFrom(nPageProp);
  if (nPageProp.type === 'title') return pagePropTitleFrom(nPageProp);
  if (nPageProp.type === 'url') return propUrlFrom(nPageProp);
  throw new Error('unknown page prop type');
}

// MAIN ====================================================================================================================================
export function pageFrom<P extends NPageAny>({properties, ...r}: P) {
  // eslint-disable-next-line unicorn/no-array-method-this-argument
  return pageCommonFrom({...r, properties: D.map(properties, pagePropFrom)});
}

export function pageCommonFrom<P extends NPageCommon>({object: _, parent, ...r}: P) {
  return pageOrDatabaseCommonFrom({...r, parent: parentFrom(parent)});
}

// LIST ====================================================================================================================================
export function listPageFrom({page: _, results, type: __, ...r}: NListPageAny) {
  return listCommonFrom({...r, results: results.map(pageFrom)});
}
