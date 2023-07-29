import {array, boolean, length, literal, maxLength, merge, object, optional, partial, pick, record, string, union} from 'valibot';
import {
  vIPageOrDatabaseCommon,
  vIParentBlock,
  vIParentPage,
  vIParentWorkspace,
  vIRichTextText,
  vId,
  vNumberFormat,
  vRollupFunction,
  vSelectOption,
} from './common';

// COMMON ==================================================================================================================================
const vIDatabasePropCommon = object({
  id: string(),
  name: string(),
});

export const vIDatabasePropSelectValue = object({options: array(merge([vSelectOption, partial(pick(vSelectOption, ['id', 'name']))]))});

// CHECKBOX ================================================================================================================================
export const vIDatabasePropCheckbox = merge([vIDatabasePropCommon, object({checkbox: object({}), type: literal('checkbox')})]);

// CREATED BY ==============================================================================================================================
export const vIDatabasePropCreatedBy = merge([vIDatabasePropCommon, object({created_by: object({}), type: literal('created_by')})]);

// CREATED TIME ============================================================================================================================
export const vIDatabasePropCreatedTime = merge([vIDatabasePropCommon, object({created_time: object({}), type: literal('created_time')})]);

// DATE ====================================================================================================================================
export const vIDatabasePropDate = merge([vIDatabasePropCommon, object({date: object({}), type: literal('date')})]);

// EMAIL ===================================================================================================================================
export const vIDatabasePropEmail = merge([vIDatabasePropCommon, object({email: object({}), type: literal('email')})]);

// FILES ===================================================================================================================================
export const vIDatabasePropFiles = merge([vIDatabasePropCommon, object({files: object({}), type: literal('files')})]);

// FORMULA =================================================================================================================================
export const vIDatabasePropFormula = merge([
  vIDatabasePropCommon,
  object({
    formula: object({
      expression: string(),
    }),
    type: literal('formula'),
  }),
]);

// LAST EDITED BY ==========================================================================================================================
export const vIDatabasePropLastEditedBy = merge([
  vIDatabasePropCommon,
  object({last_edited_by: object({}), type: literal('last_edited_by')}),
]);

// LAST EDITED TIME ========================================================================================================================
export const vIDatabasePropLastEditedTime = merge([
  vIDatabasePropCommon,
  object({
    last_edited_time: object({}),
    type: literal('last_edited_time'),
  }),
]);

// MULTI SELECT ============================================================================================================================
export const vIDatabasePropMultiSelect = merge([
  vIDatabasePropCommon,
  object({
    multi_select: vIDatabasePropSelectValue,
    type: literal('multi_select'),
  }),
]);

// NUMBER ==================================================================================================================================
export const vIDatabasePropNumber = merge([
  vIDatabasePropCommon,
  object({number: object({format: vNumberFormat}), type: literal('number')}),
]);

// PEOPLE ==================================================================================================================================
export const vIDatabasePropPeople = merge([vIDatabasePropCommon, object({people: object({}), type: literal('people')})]);

// PHONE NUMBER ============================================================================================================================
export const vIDatabasePropPhoneNumber = merge([vIDatabasePropCommon, object({phone_number: object({}), type: literal('phone_number')})]);

// RELATION ================================================================================================================================
export const vIDatabasePropRelation = merge([
  vIDatabasePropCommon,
  object({
    relation: object({
      database_id: vId,
      synced_property_id: optional(string()),
      synced_property_name: optional(string()),
    }),
    type: literal('relation'),
  }),
]);

// RICH TEXT ===============================================================================================================================
export const vIDatabasePropRichText = merge([vIDatabasePropCommon, object({rich_text: object({}), type: literal('rich_text')})]);

// ROLLUP ==================================================================================================================================
export const vIDatabasePropRollup = merge([
  vIDatabasePropCommon,
  object({
    rollup: object({
      function: vRollupFunction,
      relation_property_id: string(),
      relation_property_name: string(),
      rollup_property_id: string(),
      rollup_property_name: string(),
    }),
    type: literal('rollup'),
  }),
]);

// SELECT ==================================================================================================================================
export const vIDatabasePropSelect = merge([vIDatabasePropCommon, object({select: vIDatabasePropSelectValue, type: literal('select')})]);

// STATUS ==================================================================================================================================
export const vIDatabasePropStatus = merge([vIDatabasePropCommon, object({status: object({}), type: literal('status')})]);

// TITLE ===================================================================================================================================
export const vIDatabasePropTitle = merge([vIDatabasePropCommon, object({title: object({}), type: literal('title')})]);

// URL =====================================================================================================================================
export const vIDatabasePropUrl = merge([vIDatabasePropCommon, object({type: literal('url'), url: object({})})]);

// PROP ====================================================================================================================================
export const vIDatabaseProp = union([
  vIDatabasePropTitle,
  vIDatabasePropRichText,
  vIDatabasePropNumber,
  vIDatabasePropSelect,
  vIDatabasePropMultiSelect,
  vIDatabasePropDate,
  vIDatabasePropPeople,
  vIDatabasePropFiles,
  vIDatabasePropCheckbox,
  vIDatabasePropUrl,
  vIDatabasePropEmail,
  vIDatabasePropPhoneNumber,
  vIDatabasePropFormula,
  vIDatabasePropRelation,
  vIDatabasePropRollup,
  vIDatabasePropCreatedTime,
  vIDatabasePropCreatedBy,
  vIDatabasePropLastEditedTime,
  vIDatabasePropLastEditedBy,
  vIDatabasePropStatus,
]);

// MAIN ====================================================================================================================================
export const vIDatabase = merge([
  vIPageOrDatabaseCommon,
  object({
    description: array(vIRichTextText, [maxLength(1)]),
    is_inline: boolean(),
    object: literal('database'),
    parent: union([vIParentBlock, vIParentPage, vIParentWorkspace]),
    properties: record(vIDatabaseProp),
    title: array(vIRichTextText, [length(1)]),
  }),
]);

// ID ======================================================================================================================================
export const vIDatabaseId = object({database_id: vId});
