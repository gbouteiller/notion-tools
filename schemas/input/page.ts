import {D} from '@mobily/ts-belt';
import type {Simplify} from 'type-fest';
import {z, type ZodRawShape} from 'zod';
import {zId, zListCommon, zPageOrDatabaseCommon, zParentDatabase, zParentPage, zParentWorkspace} from './common';
import {
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
  zPropPeopleValue,
  zPropPhoneNumber,
  zPropRelationValue,
  zPropRichTextValue,
  zPropRollupValue,
  zPropSelect,
  zPropSimplePeople,
  zPropSimpleRelation,
  zPropSimpleRichText,
  zPropSimpleRollup,
  zPropSimpleTitle,
  zPropStatus,
  zPropTitleValue,
  zPropUrl,
} from './prop';

// CHECKBOX ================================================================================================================================
// export const zPagePropCheckbox = zPropCheckbox.shape, 'object')});
export const zPagePropCheckbox = z.object({...D.deleteKey(zPropCheckbox.shape, 'object')});
export type PagePropCheckbox = Simplify<z.infer<typeof zPagePropCheckbox>>;

// CREATED BY ==============================================================================================================================
export const zPagePropCreatedBy = z.object({...D.deleteKey(zPropCreatedBy.shape, 'object')});
export type PagePropCreatedBy = Simplify<z.infer<typeof zPagePropCreatedBy>>;

// CREATED TIME ============================================================================================================================
export const zPagePropCreatedTime = z.object({...D.deleteKey(zPropCreatedTime.shape, 'object')});
export type PagePropCreatedTime = Simplify<z.infer<typeof zPagePropCreatedTime>>;

// DATE ====================================================================================================================================
export const zPagePropDate = z.object({...D.deleteKey(zPropDate.shape, 'object')});
export type PagePropDate = Simplify<z.infer<typeof zPagePropDate>>;

// EMAIL ===================================================================================================================================
export const zPagePropEmail = z.object({...D.deleteKey(zPropEmail.shape, 'object')});
export type PagePropEmail = Simplify<z.infer<typeof zPagePropEmail>>;

// FILES ===================================================================================================================================
export const zPagePropFiles = z.object({...D.deleteKey(zPropFiles.shape, 'object')});
export type PagePropFiles = Simplify<z.infer<typeof zPagePropFiles>>;

// FORMULA =================================================================================================================================
export const zPagePropFormula = z.object({...D.deleteKey(zPropFormula.shape, 'object')});
export type PagePropFormula = Simplify<z.infer<typeof zPagePropFormula>>;

// LAST EDITED BY ==========================================================================================================================
export const zPagePropLastEditedBy = z.object({...D.deleteKey(zPropLastEditedBy.shape, 'object')});
export type PagePropLastEditedBy = Simplify<z.infer<typeof zPagePropLastEditedBy>>;

// LAST EDITED TIME ========================================================================================================================
export const zPagePropLastEditedTime = z.object({...D.deleteKey(zPropLastEditedTime.shape, 'object')});
export type PagePropLastEditedTime = Simplify<z.infer<typeof zPagePropLastEditedTime>>;

// MULTI-SELECT ============================================================================================================================
export const zPagePropMultiSelect = z.object({...D.deleteKey(zPropMultiSelect.shape, 'object')});
export type PagePropMultiSelect = Simplify<z.infer<typeof zPagePropMultiSelect>>;

// NUMBER ==================================================================================================================================
export const zPagePropNumber = z.object({...D.deleteKey(zPropNumber.shape, 'object')});
export type PagePropNumber = Simplify<z.infer<typeof zPagePropNumber>>;

// PEOPLE ==================================================================================================================================
export const zPagePropPeople = z.object({...D.deleteKey(zPropSimplePeople.shape, 'object'), people: zPropPeopleValue.array()});
export type PagePropPeople = z.infer<typeof zPagePropPeople>;

// PHONE NUMBER ============================================================================================================================
export const zPagePropPhoneNumber = z.object({...D.deleteKey(zPropPhoneNumber.shape, 'object')});
export type PagePropPhoneNumber = Simplify<z.infer<typeof zPagePropPhoneNumber>>;

// RELATION ================================================================================================================================
export const zPagePropRelation = z.object({
  ...D.deleteKey(zPropSimpleRelation.shape, 'object'),
  has_more: z.boolean(),
  relation: zPropRelationValue.array(),
});
export type PagePropRelation = Simplify<z.infer<typeof zPagePropRelation>>;

// RICH TEXT ===============================================================================================================================
export const zPagePropRichText = z.object({...D.deleteKey(zPropSimpleRichText.shape, 'object'), rich_text: zPropRichTextValue.array()});
export type PagePropRichText = z.infer<typeof zPagePropRichText>;

// ROLLUP ==================================================================================================================================
export const zPagePropRollup = z.object({...D.deleteKey(zPropSimpleRollup.shape, 'object'), rollup: zPropRollupValue});
export type PagePropRollup = z.infer<typeof zPagePropRollup>;

// SELECT ==================================================================================================================================
export const zPagePropSelect = z.object({...D.deleteKey(zPropSelect.shape, 'object')});
export type PagePropSelect = z.infer<typeof zPagePropSelect>;

// STATUS ==================================================================================================================================
export const zPagePropStatus = z.object({...D.deleteKey(zPropStatus.shape, 'object')});
export type PagePropStatus = Simplify<z.infer<typeof zPagePropStatus>>;

// TITLE ===================================================================================================================================
export const zPagePropTitle = z.object({...D.deleteKey(zPropSimpleTitle.shape, 'object'), title: zPropTitleValue.array()});
export type PagePropTitle = z.infer<typeof zPagePropTitle>;

// URL =====================================================================================================================================
export const zPagePropUrl = z.object({...D.deleteKey(zPropUrl.shape, 'object')});
export type PagePropUrl = Simplify<z.infer<typeof zPagePropUrl>>;

// PROP ====================================================================================================================================
export const zPageProp = z.union([
  zPagePropCheckbox,
  zPagePropCreatedBy,
  zPagePropCreatedTime,
  zPagePropDate,
  zPagePropEmail,
  zPagePropFiles,
  zPagePropFormula,
  zPagePropLastEditedBy,
  zPagePropLastEditedTime,
  zPagePropMultiSelect,
  zPagePropNumber,
  zPagePropPeople,
  zPagePropPhoneNumber,
  zPagePropRelation,
  zPagePropRichText,
  zPagePropRollup,
  zPagePropSelect,
  zPagePropStatus,
  zPagePropUrl,
  zPagePropTitle,
]);
export type PageProp = z.infer<typeof zPageProp>;

// MAIN ====================================================================================================================================
export const zPageCommon = z.object({
  ...zPageOrDatabaseCommon.shape,
  object: z.literal('page'),
  parent: z.union([zParentDatabase, zParentPage, zParentWorkspace]),
});
export type PageCommon = z.infer<typeof zPageCommon>;

export const zPageAny = z.object({...zPageCommon.shape, properties: z.record(zPageProp), });
export type PageAny = z.infer<typeof zPageAny>;

export function zPage<P extends ZodRawShape>(props: P) {
  return z.object({...zPageAny.shape, properties: z.object(props)});
}
export type Page<Props> = PageAny & {properties: Props}

// ID ======================================================================================================================================
export const zPageId = z.object({page_id: zId});
export type PageId = z.infer<typeof zPageId>;

// LIST ====================================================================================================================================
export const zListPageAny = z.object({
  ...zListCommon.shape,
  page: z.object({}),
  results: zPageAny.array(),
  type: z.literal('page'),
});
export type ListPageAny = z.infer<typeof zListPageAny>;
