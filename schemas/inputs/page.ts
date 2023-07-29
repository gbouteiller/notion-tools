import {array, boolean, literal, merge, object, omit, record, union} from 'valibot';
import {vIListCommon, vIPageOrDatabaseCommon, vIParentDatabase, vIParentPage, vIParentWorkspace, vId} from './common';
import {
  vIPropCheckbox,
  vIPropCreatedBy,
  vIPropCreatedTime,
  vIPropDate,
  vIPropEmail,
  vIPropFiles,
  vIPropFormula,
  vIPropLastEditedBy,
  vIPropLastEditedTime,
  vIPropMultiSelect,
  vIPropNumber,
  vIPropPeopleValue,
  vIPropPhoneNumber,
  vIPropRelationValue,
  vIPropRichTextValue,
  vIPropRollupValue,
  vIPropSelect,
  vIPropSimplePeople,
  vIPropSimpleRelation,
  vIPropSimpleRichText,
  vIPropSimpleRollup,
  vIPropSimpleTitle,
  vIPropStatus,
  vIPropTitleValue,
  vIPropUrl,
} from './prop';

// CHECKBOX ================================================================================================================================
export const vIPagePropCheckbox = omit(vIPropCheckbox, ['object']);

// CREATED BY ==============================================================================================================================
export const vIPagePropCreatedBy = omit(vIPropCreatedBy, ['object']);

// CREATED TIME ============================================================================================================================
export const vIPagePropCreatedTime = omit(vIPropCreatedTime, ['object']);

// DATE ====================================================================================================================================
export const vIPagePropDate = omit(vIPropDate, ['object']);

// EMAIL ===================================================================================================================================
export const vIPagePropEmail = omit(vIPropEmail, ['object']);

// FILES ===================================================================================================================================
export const vIPagePropFiles = omit(vIPropFiles, ['object']);

// FORMULA =================================================================================================================================
export const vIPagePropFormula = omit(vIPropFormula, ['object']);

// LAST EDITED BY ==========================================================================================================================
export const vIPagePropLastEditedBy = omit(vIPropLastEditedBy, ['object']);

// LAST EDITED TIME ========================================================================================================================
export const vIPagePropLastEditedTime = omit(vIPropLastEditedTime, ['object']);

// MULTI-SELECT ============================================================================================================================
export const vIPagePropMultiSelect = omit(vIPropMultiSelect, ['object']);

// NUMBER ==================================================================================================================================
export const vIPagePropNumber = omit(vIPropNumber, ['object']);

// PEOPLE ==================================================================================================================================
export const vIPagePropPeople = merge([omit(vIPropSimplePeople, ['object']), object({people: array(vIPropPeopleValue)})]);

// PHONE NUMBER ============================================================================================================================
export const vIPagePropPhoneNumber = omit(vIPropPhoneNumber, ['object']);

// RELATION ================================================================================================================================
export const vIPagePropRelation = merge([
  omit(vIPropSimpleRelation, ['object']),
  object({
    has_more: boolean(),
    relation: array(vIPropRelationValue),
  }),
]);

// RICH TEXT ===============================================================================================================================
export const vIPagePropRichText = merge([omit(vIPropSimpleRichText, ['object']), object({rich_text: array(vIPropRichTextValue)})]);

// ROLLUP ==================================================================================================================================
export const vIPagePropRollup = merge([omit(vIPropSimpleRollup, ['object']), object({rollup: vIPropRollupValue})]);

// SELECT ==================================================================================================================================
export const vIPagePropSelect = omit(vIPropSelect, ['object']);

// STATUS ==================================================================================================================================
export const vIPagePropStatus = omit(vIPropStatus, ['object']);

// TITLE ===================================================================================================================================
export const vIPagePropTitle = merge([omit(vIPropSimpleTitle, ['object']), object({title: array(vIPropTitleValue)})]);

// URL =====================================================================================================================================
export const vIPagePropUrl = omit(vIPropUrl, ['object']);

// PROP ====================================================================================================================================
export const vIPageProp = union([
  vIPagePropCheckbox,
  vIPagePropCreatedBy,
  vIPagePropCreatedTime,
  vIPagePropDate,
  vIPagePropEmail,
  vIPagePropFiles,
  vIPagePropFormula,
  vIPagePropLastEditedBy,
  vIPagePropLastEditedTime,
  vIPagePropMultiSelect,
  vIPagePropNumber,
  vIPagePropPeople,
  vIPagePropPhoneNumber,
  vIPagePropRelation,
  vIPagePropRichText,
  vIPagePropRollup,
  vIPagePropSelect,
  vIPagePropStatus,
  vIPagePropUrl,
  vIPagePropTitle,
]);

// MAIN ====================================================================================================================================
export const vIPage = merge([
  vIPageOrDatabaseCommon,
  object({
    object: literal('page'),
    parent: union([vIParentDatabase, vIParentPage, vIParentWorkspace]),
    properties: record(vIPageProp),
  }),
]);

// ID ======================================================================================================================================
export const vIPageId = object({page_id: vId});

// LIST ====================================================================================================================================
export const vIListPage = merge([
  vIListCommon,
  object({
    page: object({}),
    results: array(vIPage),
    type: literal('page'),
  }),
]);
