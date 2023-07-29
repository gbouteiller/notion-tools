import {array, boolean, literal, merge, nullable, number, object, string, union} from 'valibot';
import {
  vIDate,
  vIFileNamed,
  vIFormula,
  vIListCommon,
  vIRichText,
  vIRollup,
  vIRollupArray,
  vIRollupDate,
  vIRollupNumber,
  vIRollupUnsupported,
  vIdRef,
  vRef,
  vSelectOption,
  vStrictColor,
} from './common';
import {vIUser} from './user';

// COMMON ==================================================================================================================================
const vIPropCommon = merge([vRef, object({object: literal('property_item')})]);
const vIPropListCommonValue = merge([vRef, object({next_url: nullable(string())})]);
const vIPropListCommon = merge([vIListCommon, object({property_item: vIPropListCommonValue, type: literal('property_item')})]);

// CHECKBOX ================================================================================================================================
export const vIPropCheckboxValue = boolean();

export const vIPropCheckbox = merge([vIPropCommon, object({checkbox: vIPropCheckboxValue, type: literal('checkbox')})]);

// CREATED BY ==============================================================================================================================
export const vIPropCreatedByValue = vIUser;

export const vIPropCreatedBy = merge([vIPropCommon, object({created_by: vIPropCreatedByValue, type: literal('created_by')})]);

// CREATED TIME ============================================================================================================================
export const vIPropCreatedTimeValue = string();

export const vIPropCreatedTime = merge([vIPropCommon, object({created_time: vIPropCreatedTimeValue, type: literal('created_time')})]);

// DATE ====================================================================================================================================
export const vIPropDateValue = nullable(vIDate);

export const vIPropDate = merge([vIPropCommon, object({date: vIPropDateValue, type: literal('date')})]);

// EMAIL ===================================================================================================================================
export const vIPropEmailValue = nullable(string());

export const vIPropEmail = merge([vIPropCommon, object({email: vIPropEmailValue, type: literal('email')})]);

// FILES ===================================================================================================================================
export const vIPropFilesValue = array(vIFileNamed);

export const vIPropFiles = merge([vIPropCommon, object({files: vIPropFilesValue, type: literal('files')})]);

// FORMULA =================================================================================================================================
export const vIPropFormulaValue = vIFormula;

export const vIPropFormula = merge([vIPropCommon, object({formula: vIPropFormulaValue, type: literal('formula')})]);

// LAST EDITED BY ==========================================================================================================================
export const vIPropLastEditedByValue = vIUser;

export const vIPropLastEditedBy = merge([vIPropCommon, object({last_edited_by: vIPropLastEditedByValue, type: literal('last_edited_by')})]);

// LAST EDITED TIME ========================================================================================================================
export const vIPropLastEditedTimeValue = string();

export const vIPropLastEditedTime = merge([
  vIPropCommon,
  object({last_edited_time: vIPropLastEditedTimeValue, type: literal('last_edited_time')}),
]);

// MULTI-SELECT ============================================================================================================================
export const vIPropMultiSelectValue = array(vSelectOption);

export const vIPropMultiSelect = merge([vIPropCommon, object({multi_select: vIPropMultiSelectValue, type: literal('multi_select')})]);

// NUMBER ==================================================================================================================================
export const vIPropNumberValue = nullable(number());

export const vIPropNumber = merge([vIPropCommon, object({number: vIPropNumberValue, type: literal('number')})]);

// PEOPLE ==================================================================================================================================
export const vIPropPeopleValue = vIUser;

export const vIPropSimplePeople = merge([vIPropCommon, object({people: vIPropPeopleValue, type: literal('people')})]);

export const vIPropPeople = merge([
  vIPropListCommon,
  object({
    property_item: merge([vIPropListCommonValue, object({people: object({}), type: literal('people')})]),
    results: array(vIPropSimplePeople),
  }),
]);

// PHONE NUMBER ============================================================================================================================
export const vIPropPhoneNumberValue = nullable(string());

export const vIPropPhoneNumber = merge([vIPropCommon, object({phone_number: vIPropPhoneNumberValue, type: literal('phone_number')})]);

// RELATION ================================================================================================================================
export const vIPropRelationValue = vIdRef;

export const vIPropSimpleRelation = merge([vIPropCommon, object({relation: vIPropRelationValue, type: literal('relation')})]);

export const vIPropRelation = merge([
  vIPropListCommon,
  object({
    property_item: merge([vIPropListCommonValue, object({relation: object({}), type: literal('relation')})]),
    results: array(vIPropSimpleRelation),
  }),
]);

// RICH TEXT ===============================================================================================================================
export const vIPropRichTextValue = vIRichText;

export const vIPropSimpleRichText = merge([vIPropCommon, object({rich_text: vIPropRichTextValue, type: literal('rich_text')})]);

export const vIPropRichText = merge([
  vIPropListCommon,
  object({
    property_item: merge([vIPropListCommonValue, object({rich_text: object({}), type: literal('rich_text')})]),
    results: array(vIPropSimpleRichText),
  }),
]);

// SELECT ==================================================================================================================================
export const vIPropSelectValue = nullable(vSelectOption);

export const vIPropSelect = merge([vIPropCommon, object({select: vIPropSelectValue, type: literal('select')})]);

// STATUS ==================================================================================================================================
export const vIPropStatusValue = nullable(merge([vRef, object({color: vStrictColor, name: string()})]));

export const vIPropStatus = merge([vIPropCommon, object({status: vIPropStatusValue, type: literal('status')})]);

// TITLE ===================================================================================================================================
export const vIPropTitleValue = vIRichText;

export const vIPropSimpleTitle = merge([vIPropCommon, object({title: vIPropTitleValue, type: literal('title')})]);

export const vIPropTitle = merge([
  vIPropListCommon,
  object({
    property_item: merge([vIPropListCommonValue, object({title: object({}), type: literal('title')})]),
    results: array(vIPropSimpleTitle),
  }),
]);

// URL =====================================================================================================================================
export const vIPropUrlValue = nullable(string());

export const vIPropUrl = merge([vIPropCommon, object({type: literal('url'), url: vIPropUrlValue})]);

// SIMPLE ==================================================================================================================================
export const vISimpleProps = [
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
  vIPropPhoneNumber,
  vIPropSelect,
  vIPropStatus,
  vIPropUrl,
] as const;

export const vIPropSimple = union([...vISimpleProps, vIPropSimplePeople, vIPropSimpleRelation, vIPropSimpleRichText, vIPropSimpleTitle]);

// ROLLUP ==================================================================================================================================
export const vIPropRollupValue = vIRollup;

export const vIPropSimpleRollup = merge([vIPropCommon, object({rollup: vIPropRollupValue, type: literal('rollup')})]);

export const vIPropRollupArray = merge([
  vIPropListCommon,
  object({
    property_item: merge([vIPropListCommonValue, object({rollup: vIRollupArray, type: literal('rollup')})]),
    results: array(vIPropSimple),
  }),
]);

export const vIPropRollupDate = merge([
  vIPropListCommon,
  object({
    property_item: merge([vIPropListCommonValue, object({rollup: vIRollupDate, type: literal('rollup')})]),
    results: array(vIPropSimpleRelation),
  }),
]);

export const vIPropRollupNumber = merge([
  vIPropListCommon,
  object({
    property_item: merge([vIPropListCommonValue, object({rollup: vIRollupNumber, type: literal('rollup')})]),
    results: array(vIPropSimpleRelation),
  }),
]);

export const vIPropRollupUnsupported = merge([
  vIPropListCommon,
  object({
    property_item: merge([vIPropListCommonValue, object({rollup: vIRollupUnsupported, type: literal('rollup')})]),
    results: array(vIPropSimple),
  }),
]);

export const vIPropRollup = union([vIPropRollupArray, vIPropRollupDate, vIPropRollupNumber, vIPropRollupUnsupported]);

// PROP ====================================================================================================================================
export const vIProp = union([...vISimpleProps, vIPropPeople, vIPropRelation, vIPropRichText, vIPropRollup, vIPropTitle]);
