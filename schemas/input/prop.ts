import type {Simplify} from 'type-fest';
import {z} from 'zod';
import {
  zDate,
  zFileNamed,
  zFormula,
  zIdRef,
  zListCommon,
  zRef,
  zRichText,
  zRollup,
  zRollupArray,
  zRollupDate,
  zRollupNumber,
  zRollupUnsupported,
  zSelectOption,
  zStrictColor
} from './common';
import {zUser} from './user';

// COMMON ==================================================================================================================================
const zPropCommon = z.object({...zRef.shape, object: z.literal('property_item')});
const zPropListCommonValue = z.object({...zRef.shape, next_url: z.string().nullable()});
const zPropListCommon = z.object({...zListCommon.shape, property_item: zPropListCommonValue, type: z.literal('property_item')});

// CHECKBOX ================================================================================================================================
export const zPropCheckboxValue = z.boolean();

export const zPropCheckbox = z.object({...zPropCommon.shape, checkbox: zPropCheckboxValue, type: z.literal('checkbox')});
export type PropCheckbox = z.infer<typeof zPropCheckbox>;

// CREATED BY ==============================================================================================================================
export const zPropCreatedByValue = zUser;

export const zPropCreatedBy = z.object({...zPropCommon.shape, created_by: zPropCreatedByValue, type: z.literal('created_by')});
export type PropCreatedBy = z.infer<typeof zPropCreatedBy>;

// CREATED TIME ============================================================================================================================
export const zPropCreatedTimeValue = z.string();

export const zPropCreatedTime = z.object({...zPropCommon.shape, created_time: zPropCreatedTimeValue, type: z.literal('created_time')});
export type PropCreatedTime = z.infer<typeof zPropCreatedTime>;

// DATE ====================================================================================================================================
export const zPropDateValue = zDate.nullable();

export const zPropDate = z.object({...zPropCommon.shape, date: zPropDateValue, type: z.literal('date')});
export type PropDate = z.infer<typeof zPropDate>;

// EMAIL ===================================================================================================================================
export const zPropEmailValue = z.string().nullable();

export const zPropEmail = z.object({...zPropCommon.shape, email: zPropEmailValue, type: z.literal('email')});
export type PropEmail = z.infer<typeof zPropEmail>;

// FILES ===================================================================================================================================
export const zPropFilesValue = zFileNamed.array();

export const zPropFiles = z.object({...zPropCommon.shape, files: zPropFilesValue, type: z.literal('files')});
export type PropFiles = z.infer<typeof zPropFiles>;

// FORMULA =================================================================================================================================
export const zPropFormulaValue = zFormula;

export const zPropFormula = z.object({...zPropCommon.shape, formula: zPropFormulaValue, type: z.literal('formula')});
export type PropFormula = z.infer<typeof zPropFormula>;

// LAST EDITED BY ==========================================================================================================================
export const zPropLastEditedByValue = zUser;

export const zPropLastEditedBy = z.object({...zPropCommon.shape, last_edited_by: zPropLastEditedByValue, type: z.literal('last_edited_by')});
export type PropLastEditedBy = z.infer<typeof zPropLastEditedBy>;

// LAST EDITED TIME ========================================================================================================================
export const zPropLastEditedTimeValue = z.string();

export const zPropLastEditedTime = z.object({...zPropCommon.shape, last_edited_time: zPropLastEditedTimeValue, type: z.literal('last_edited_time')});
export type PropLastEditedTime = z.infer<typeof zPropLastEditedTime>;

// MULTI-SELECT ============================================================================================================================
export const zPropMultiSelectValue = zSelectOption.array();

export const zPropMultiSelect = z.object({...zPropCommon.shape, multi_select: zPropMultiSelectValue, type: z.literal('multi_select')});
export type PropMultiSelect = z.infer<typeof zPropMultiSelect>;

// NUMBER ==================================================================================================================================
export const zPropNumberValue = z.number().nullable();

export const zPropNumber = z.object({...zPropCommon.shape, number: zPropNumberValue, type: z.literal('number')});
export type PropNumber = z.infer<typeof zPropNumber>;

// PEOPLE ==================================================================================================================================
export const zPropPeopleValue = zUser;

export const zPropSimplePeople = z.object({...zPropCommon.shape, people: zPropPeopleValue, type: z.literal('people')});
export type PropSimplePeople = Simplify<z.infer<typeof zPropSimplePeople>>;

export const zPropPeople = z.object({
  ...zPropListCommon.shape,
  property_item: z.object({...zPropListCommonValue.shape, people: z.object({}), type: z.literal('people')}),
  results: zPropSimplePeople.array(),
});
export type PropPeople = Simplify<z.infer<typeof zPropPeople>>;

// PHONE NUMBER ============================================================================================================================
export const zPropPhoneNumberValue = z.string().nullable();

export const zPropPhoneNumber = z.object({...zPropCommon.shape, phone_number: zPropPhoneNumberValue, type: z.literal('phone_number')});
export type PropPhoneNumber = z.infer<typeof zPropPhoneNumber>;

// RELATION ================================================================================================================================
export const zPropRelationValue = zIdRef;

export const zPropSimpleRelation = z.object({...zPropCommon.shape, relation: zPropRelationValue, type: z.literal('relation')});
export type PropSimpleRelation = Simplify<z.infer<typeof zPropSimpleRelation>>;

export const zPropRelation = z.object({
  ...zPropListCommon.shape,
  property_item: z.object({...zPropListCommonValue.shape, relation: z.object({}), type: z.literal('relation')}),
  results: zPropSimpleRelation.array(),
});
export type PropRelation = Simplify<z.infer<typeof zPropRelation>>;

// RICH TEXT ===============================================================================================================================
export const zPropRichTextValue = zRichText;

export const zPropSimpleRichText = z.object({...zPropCommon.shape, rich_text: zPropRichTextValue, type: z.literal('rich_text')});
export type PropSimpleRichText = Simplify<z.infer<typeof zPropSimpleRichText>>;

export const zPropRichText = z.object({
  ...zPropListCommon.shape,
  property_item: z.object({...zPropListCommonValue.shape, rich_text: z.object({}), type: z.literal('rich_text')}),
  results: zPropSimpleRichText.array(),
});
export type PropRichText = Simplify<z.infer<typeof zPropRichText>>;

// SELECT ==================================================================================================================================
export const zPropSelectValue = zSelectOption.nullable();

export const zPropSelect = z.object({...zPropCommon.shape, select: zPropSelectValue, type: z.literal('select')});
export type PropSelect = z.infer<typeof zPropSelect>;

// STATUS ==================================================================================================================================
export const zPropStatusValue = z.object({...zRef.shape, color: zStrictColor, name: z.string()}).nullable();

export const zPropStatus = z.object({...zPropCommon.shape, status: zPropStatusValue, type: z.literal('status')});
export type PropStatus = z.infer<typeof zPropStatus>;

// TITLE ===================================================================================================================================
export const zPropTitleValue = zRichText;

export const zPropSimpleTitle = z.object({...zPropCommon.shape, title: zPropTitleValue, type: z.literal('title')});
export type PropSimpleTitle = z.infer<typeof zPropSimpleTitle>;

export const zPropTitle = z.object({
  ...zPropListCommon.shape,
  property_item: z.object({...zPropListCommonValue.shape, title: z.object({}), type: z.literal('title')}),
  results: zPropSimpleTitle.array(),
});
export type PropTitle = Simplify<z.infer<typeof zPropTitle>>;

// URL =====================================================================================================================================
export const zPropUrlValue = z.string().nullable();

export const zPropUrl = z.object({...zPropCommon.shape, type: z.literal('url'), url: zPropUrlValue});
export type PropUrl = z.infer<typeof zPropUrl>;

// SIMPLE ==================================================================================================================================
export const zSimpleProps = [
  zPropCheckbox,
  zPropCreatedBy,
  zPropCreatedTime,
  zPropDate,
  zPropEmail,
  zPropFiles,
  zPropFormula,
  zPropLastEditedBy,
  zPropLastEditedTime,
  zPropMultiSelect,
  zPropNumber,
  zPropPhoneNumber,
  zPropSelect,
  zPropStatus,
  zPropUrl,
] as const;

export const zPropSimple = z.union([...zSimpleProps, zPropSimplePeople, zPropSimpleRelation, zPropSimpleRichText, zPropSimpleTitle]);
export type PropSimple = z.infer<typeof zPropSimple>;

// ROLLUP ==================================================================================================================================
export const zPropRollupValue = zRollup;

export const zPropSimpleRollup = z.object({...zPropCommon.shape, rollup: zPropRollupValue, type: z.literal('rollup')});
export type PropSimpleRollup = Simplify<z.infer<typeof zPropSimpleRollup>>;

export const zPropRollupArray = z.object({
  ...zPropListCommon.shape,
  property_item: z.object({...zPropListCommonValue.shape, rollup: zRollupArray, type: z.literal('rollup')}),
  results: zPropSimple.array(),
});
export type PropRollupArray = Simplify<z.infer<typeof zPropRollupArray>>;

export const zPropRollupDate = z.object({
  ...zPropListCommon.shape,
  property_item: z.object({...zPropListCommonValue.shape, rollup: zRollupDate, type: z.literal('rollup')}),
  results: zPropSimpleRelation.array(),
});
export type PropRollupDate = Simplify<z.infer<typeof zPropRollupDate>>;

export const zPropRollupNumber = z.object({
  ...zPropListCommon.shape,
  property_item: z.object({...zPropListCommonValue.shape, rollup: zRollupNumber, type: z.literal('rollup')}),
  results: zPropSimpleRelation.array(),
});
export type PropRollupNumber = Simplify<z.infer<typeof zPropRollupNumber>>;

export const zPropRollupUnsupported = z.object({
  ...zPropListCommon.shape,
  property_item: z.object({...zPropListCommonValue.shape, rollup: zRollupUnsupported, type: z.literal('rollup')}),
  results: zPropSimple.array(),
});
export type PropRollupUnsupported = Simplify<z.infer<typeof zPropRollupUnsupported>>;

export const zPropRollup = z.union([zPropRollupArray, zPropRollupDate, zPropRollupNumber, zPropRollupUnsupported]);
export type PropRollup = Simplify<z.infer<typeof zPropRollup>>;

// PROP ====================================================================================================================================
export const zProp = z.union([...zSimpleProps, zPropPeople, zPropRelation, zPropRichText, zPropRollup, zPropTitle]);
export type Prop = z.infer<typeof zProp>;
