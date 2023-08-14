import {D} from '@mobily/ts-belt';
import {
  type Prop as NProp,
  type PropCheckbox as NPropCheckbox,
  type PropCreatedBy as NPropCreatedBy,
  type PropCreatedTime as NPropCreatedTime,
  type PropDate as NPropDate,
  type PropEmail as NPropEmail,
  type PropFiles as NPropFiles,
  type PropFormula as NPropFormula,
  type PropLastEditedBy as NPropLastEditedBy,
  type PropLastEditedTime as NPropLastEditedTime,
  type PropMultiSelect as NPropMultiSelect,
  type PropNumber as NPropNumber,
  type PropPeople as NPropPeople,
  type PropPhoneNumber as NPropPhoneNumber,
  type PropRelation as NPropRelation,
  type PropRichText as NPropRichText,
  type PropRollup as NPropRollup,
  type PropSelect as NPropSelect,
  type PropSimple as NPropSimple,
  type PropSimplePeople as NPropSimplePeople,
  type PropSimpleRelation as NPropSimpleRelation,
  type PropSimpleRichText as NPropSimpleRichText,
  type PropSimpleTitle as NPropSimpleTitle,
  type PropStatus as NPropStatus,
  type PropTitle as NPropTitle,
  type PropUrl as NPropUrl
} from '../schemas/input';
import {banNull, dateFrom, fileNamedFrom, formulaFrom, richTextFrom, rollupFrom} from './common';
import {userFrom} from './user';

// CHECKBOX ================================================================================================================================
export function propCheckboxFrom({checkbox: value, id, type}: Omit<NPropCheckbox, 'object'>) {
  return {id, type, value};
}
export type PropCheckbox = ReturnType<typeof propCheckboxFrom>;

// CREATED BY ==============================================================================================================================
export function propCreatedByFrom({created_by, id, type}: Omit<NPropCreatedBy, 'object'>) {
  return {id, type, value: userFrom(created_by)};
}
export type PropCreatedBy = ReturnType<typeof propCreatedByFrom>;

// CREATED TIME ============================================================================================================================
export function propCreatedTimeFrom({created_time: value, id, type}: Omit<NPropCreatedTime, 'object'>) {
  return {id, type, value};
}
export type PropCreatedTime = ReturnType<typeof propCreatedTimeFrom>;

// DATE ====================================================================================================================================
export function propDateFrom({date, id, type}: Omit<NPropDate, 'object'>) {
  return {id, type, value: date ? dateFrom(date) : undefined};
}
export type PropDate = ReturnType<typeof propDateFrom>;

// EMAIL ===================================================================================================================================
export function propEmailFrom({email, id, type}: Omit<NPropEmail, 'object'>) {
  return {id, type, value: banNull(email)};
}
export type PropEmail = ReturnType<typeof propEmailFrom>;

// FILES ===================================================================================================================================
export function propFilesFrom({files, id, type}: Omit<NPropFiles, 'object'>) {
  return {id, type, value: files.map(fileNamedFrom)};
}
export type PropFiles = ReturnType<typeof propFilesFrom>;

// FORMULA =================================================================================================================================
export function propFormulaFrom({formula, id, type}: Omit<NPropFormula, 'object'>) {
  return {id, type, value: formulaFrom(formula)};
}
export type PropFormula = ReturnType<typeof propFormulaFrom>;

// LAST EDITED BY ==========================================================================================================================
export function propLastEditedByFrom({id, last_edited_by, type}: Omit<NPropLastEditedBy, 'object'>) {
  return {id, type, value: userFrom(last_edited_by)};
}
export type PropLastEditedBy= ReturnType<typeof propLastEditedByFrom>;

// LAST EDITED TIME ========================================================================================================================
export function propLastEditedTimeFrom({id, last_edited_time: value, type}: Omit<NPropLastEditedTime, 'object'>) {
  return {id, type, value};
}
export type PropLastEditedTime = ReturnType<typeof propLastEditedTimeFrom>;

// MULTI-SELECT ============================================================================================================================
export function propMultiSelectFrom({id, multi_select: value, type}: Omit<NPropMultiSelect, 'object'>) {
  return {id, type, value};
}
export type PropMultiSelect= ReturnType<typeof propMultiSelectFrom>;

// NUMBER ==================================================================================================================================
export function propNumberFrom({id, number, type}: Omit<NPropNumber, 'object'>) {
  return {id, type, value: banNull(number)};
}
export type PropNumber = ReturnType<typeof propNumberFrom>;

// PEOPLE ==================================================================================================================================
export function propPeopleFrom({property_item: {id, type}, results}: Omit<NPropPeople, 'object'>) {
  return {id, type, value: results.map(({people}) => userFrom(people))};
}
export type PropPeople= ReturnType<typeof propPeopleFrom>;

export function propSimplePeopleFrom({id, people, type}: Omit<NPropSimplePeople, 'object'>) {
  return {id, type, value: userFrom(people)};
}
export type PropSimplePeople= ReturnType<typeof propSimplePeopleFrom>;

// PHONE NUMBER ============================================================================================================================
export function propPhoneNumberFrom({id, phone_number, type}: Omit<NPropPhoneNumber, 'object'>) {
  return {id, type, value: banNull(phone_number)};
}
export type PropPhoneNumber = ReturnType<typeof propPhoneNumberFrom>;

// RELATION ================================================================================================================================
export function propRelationFrom({has_more: hasMore, property_item: {id, type}, results}: Omit<NPropRelation, 'object'>) {
  return {hasMore, id, type, value: results.map(({relation}) => relation.id)};
}
export type PropRelation= ReturnType<typeof propRelationFrom>;

export function propSimpleRelationFrom({id, relation, type}: Omit<NPropSimpleRelation, 'object'>) {
  return {id, type, value: relation.id};
}
export type PropSimpleRelation = ReturnType<typeof propSimpleRelationFrom>;

// RICH TEXT ===============================================================================================================================
export function propRichTextFrom({property_item: {id, type}, results}: Omit<NPropRichText, 'object'>) {
  return {id, type, value: results.map(({rich_text}) => richTextFrom(rich_text))};
}
export type PropRichText = ReturnType<typeof propRichTextFrom>;

export function propSimpleRichTextFrom({id, rich_text, type}: Omit<NPropSimpleRichText, 'object'>) {
  return {id, type, value: richTextFrom(rich_text)};
}

// ROLLUP ==================================================================================================================================
export function propRollupFrom({property_item: {id, rollup, type}, results}: Omit<NPropRollup, 'object'>) {
  if (rollup.type === 'array') rollup.array = results.map((prop) => D.deleteKey(propSimpleFrom(prop), 'id'));
  // MONKEY PATCH
  if (rollup.type === 'unsupported' && rollup.function === 'show_unique')
    rollup = {...rollup, array: results.map((prop) => D.deleteKey(propSimpleFrom(prop), 'id')), type: 'array'};
  return {id, type, value: rollupFrom(rollup)};
}
export type PropRollup = ReturnType<typeof propRollupFrom>;

// SELECT ==================================================================================================================================
export function propSelectFrom({id, select, type}: Omit<NPropSelect, 'object'>) {
  return {id, type, value: banNull(select)};
}
export type PropSelect = ReturnType<typeof propSelectFrom>;

// STATUS ==================================================================================================================================
export function propStatusFrom({id, status, type}: Omit<NPropStatus, 'object'>) {
  return {id, type, value: banNull(status)};
}
export type PropStatus= ReturnType<typeof propStatusFrom>;

// TITLE ===================================================================================================================================
export function propTitleFrom({property_item: {id, type}, results}: Pick<NPropTitle, 'property_item' | 'results'>) {
  return {id, type, value: results.map(({title}) => richTextFrom(title))};
}
export type PropTitle = ReturnType<typeof propTitleFrom>;

export function propSimpleTitleFrom({id, title, type}: Omit<NPropSimpleTitle, 'object'>) {
  return {id, type, value: richTextFrom(title)};
}
export type PropSimpleTitle = ReturnType<typeof propSimpleTitleFrom>;

// URL =====================================================================================================================================
export function propUrlFrom({id, type, url}: Omit<NPropUrl, 'object'>) {
  return {id, type, value: banNull(url)};
}
export type PropUrl = ReturnType<typeof propUrlFrom>;

// PROP ====================================================================================================================================
export function propExceptRollupFrom<P extends Exclude<NProp, NPropRollup>>(nProp: P) {
  if (nProp.type === 'checkbox') return propCheckboxFrom(nProp);
  if (nProp.type === 'created_by') return propCreatedByFrom(nProp);
  if (nProp.type === 'created_time') return propCreatedTimeFrom(nProp);
  if (nProp.type === 'date') return propDateFrom(nProp);
  if (nProp.type === 'email') return propEmailFrom(nProp);
  if (nProp.type === 'files') return propFilesFrom(nProp);
  if (nProp.type === 'formula') return propFormulaFrom(nProp);
  if (nProp.type === 'last_edited_by') return propLastEditedByFrom(nProp);
  if (nProp.type === 'last_edited_time') return propLastEditedTimeFrom(nProp);
  if (nProp.type === 'multi_select') return propMultiSelectFrom(nProp);
  if (nProp.type === 'number') return propNumberFrom(nProp);
  if (nProp.type === 'phone_number') return propPhoneNumberFrom(nProp);
  if (nProp.type === 'select') return propSelectFrom(nProp);
  if (nProp.type === 'status') return propStatusFrom(nProp);
  if (nProp.type === 'url') return propUrlFrom(nProp);
  if (nProp.property_item.type === 'people') return propPeopleFrom(nProp as NPropPeople);
  if (nProp.property_item.type === 'relation') return propRelationFrom(nProp as NPropRelation);
  if (nProp.property_item.type === 'rich_text') return propRichTextFrom(nProp as NPropRichText);
  if (nProp.property_item.type === 'title') return propTitleFrom(nProp as NPropTitle);
  throw new Error('unknown page prop type');
}

export function propFrom<P extends NProp>(nProp: P) {
  return isNPropRollup(nProp) ? propRollupFrom(nProp) : propExceptRollupFrom(nProp);
}
export type Prop = ReturnType<typeof propFrom>;

export function propSimpleFrom<P extends NPropSimple>(nPropSimple: P) {
  if (nPropSimple.type === 'people') return propSimplePeopleFrom(nPropSimple);
  if (nPropSimple.type === 'relation') return propSimpleRelationFrom(nPropSimple);
  if (nPropSimple.type === 'rich_text') return propSimpleRichTextFrom(nPropSimple);
  if (nPropSimple.type === 'title') return propSimpleTitleFrom(nPropSimple);
  return propExceptRollupFrom(nPropSimple);
}

// export function propValueFrom<P extends Pick<Prop, 'value'>>({value}: P) {
//   return value;
// }

function isNPropRollup(nProp: NProp): nProp is NPropRollup {
  return nProp.type === 'property_item' && nProp.property_item.type === 'rollup';
}
