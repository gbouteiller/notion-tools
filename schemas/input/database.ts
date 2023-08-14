import {z} from 'zod';
import {
  zId,
  zNumberFormat,
  zPageOrDatabaseCommon,
  zParentBlock,
  zParentPage,
  zParentWorkspace,
  zRichTextText,
  zRollupFunction,
  zSelectOption
} from './common';

// COMMON ==================================================================================================================================
const zDatabasePropCommon = z.object({
  id: z.string(),
  name: z.string(),
});

export const zDatabasePropSelectValue = z.object({options: zSelectOption.partial({id: true, name: true}).array()});

// CHECKBOX ================================================================================================================================
export const zDatabasePropCheckbox = z.object({...zDatabasePropCommon.shape, checkbox: z.object({}), type: z.literal('checkbox')});

// CREATED BY ==============================================================================================================================
export const zDatabasePropCreatedBy = z.object({...zDatabasePropCommon.shape, created_by: z.object({}), type: z.literal('created_by')});

// CREATED TIME ============================================================================================================================
export const zDatabasePropCreatedTime = z.object({...zDatabasePropCommon.shape, created_time: z.object({}), type: z.literal('created_time')});

// DATE ====================================================================================================================================
export const zDatabasePropDate = z.object({...zDatabasePropCommon.shape, date: z.object({}), type: z.literal('date')});

// EMAIL ===================================================================================================================================
export const zDatabasePropEmail = z.object({...zDatabasePropCommon.shape, email: z.object({}), type: z.literal('email')});

// FILES ===================================================================================================================================
export const zDatabasePropFiles = z.object({...zDatabasePropCommon.shape, files: z.object({}), type: z.literal('files')});

// FORMULA =================================================================================================================================
export const zDatabasePropFormula = z.object({
  ...zDatabasePropCommon.shape,
  formula: z.object({
    expression: z.string(),
  }),
  type: z.literal('formula'),
});

// LAST EDITED BY ==========================================================================================================================
export const zDatabasePropLastEditedBy = z.object({...zDatabasePropCommon.shape, last_edited_by: z.object({}), type: z.literal('last_edited_by')});

// LAST EDITED TIME ========================================================================================================================
export const zDatabasePropLastEditedTime = z.object({
  ...zDatabasePropCommon.shape,
  last_edited_time: z.object({}),
  type: z.literal('last_edited_time'),
});

// MULTI SELECT ============================================================================================================================
export const zDatabasePropMultiSelect = z.object({
  ...zDatabasePropCommon.shape,
  multi_select: zDatabasePropSelectValue,
  type: z.literal('multi_select'),
});

// NUMBER ==================================================================================================================================
export const zDatabasePropNumber = z.object({...zDatabasePropCommon.shape, number: z.object({format: zNumberFormat}), type: z.literal('number')});

// PEOPLE ==================================================================================================================================
export const zDatabasePropPeople = z.object({...zDatabasePropCommon.shape, people: z.object({}), type: z.literal('people')});

// PHONE NUMBER ============================================================================================================================
export const zDatabasePropPhoneNumber = z.object({...zDatabasePropCommon.shape, phone_number: z.object({}), type: z.literal('phone_number')});

// RELATION ================================================================================================================================
export const zDatabasePropRelation = z.object({
  ...zDatabasePropCommon.shape,
  relation: z.object({
    database_id: zId,
    synced_property_id: z.string().optional(),
    synced_property_name: z.string().optional(),
  }),
  type: z.literal('relation'),
});

// RICH TEXT ===============================================================================================================================
export const zDatabasePropRichText = z.object({...zDatabasePropCommon.shape, rich_text: z.object({}), type: z.literal('rich_text')});

// ROLLUP ==================================================================================================================================
export const zDatabasePropRollup = z.object({
  ...zDatabasePropCommon.shape,
  rollup: z.object({
    function: zRollupFunction,
    relation_property_id: z.string(),
    relation_property_name: z.string(),
    rollup_property_id: z.string(),
    rollup_property_name: z.string(),
  }),
  type: z.literal('rollup'),
});

// SELECT ==================================================================================================================================
export const zDatabasePropSelect = z.object({...zDatabasePropCommon.shape, select: zDatabasePropSelectValue, type: z.literal('select')});

// STATUS ==================================================================================================================================
export const zDatabasePropStatus = z.object({...zDatabasePropCommon.shape, status: z.object({}), type: z.literal('status')});

// TITLE ===================================================================================================================================
export const zDatabasePropTitle = z.object({...zDatabasePropCommon.shape, title: z.object({}), type: z.literal('title')});
export type DatabasePropTitle = z.infer<typeof zDatabasePropTitle>;

// URL =====================================================================================================================================
export const zDatabasePropUrl = z.object({...zDatabasePropCommon.shape, type: z.literal('url'), url: z.object({})});

// PROP ====================================================================================================================================
export const zDatabaseProp = z.union([
  zDatabasePropTitle,
  zDatabasePropRichText,
  zDatabasePropNumber,
  zDatabasePropSelect,
  zDatabasePropMultiSelect,
  zDatabasePropDate,
  zDatabasePropPeople,
  zDatabasePropFiles,
  zDatabasePropCheckbox,
  zDatabasePropUrl,
  zDatabasePropEmail,
  zDatabasePropPhoneNumber,
  zDatabasePropFormula,
  zDatabasePropRelation,
  zDatabasePropRollup,
  zDatabasePropCreatedTime,
  zDatabasePropCreatedBy,
  zDatabasePropLastEditedTime,
  zDatabasePropLastEditedBy,
  zDatabasePropStatus,
]);
export type DatabaseProp = z.infer<typeof zDatabaseProp>;

// MAIN ====================================================================================================================================
export const zDatabase = z.object({
  ...zPageOrDatabaseCommon.shape,
  description: zRichTextText.array().max(1),
  is_inline: z.boolean(),
  object: z.literal('database'),
  parent: z.union([zParentBlock, zParentPage, zParentWorkspace]),
  properties: z.record(zDatabaseProp),
  title: zRichTextText.array().length(1),
});
export type Database = z.infer<typeof zDatabase>;

// ID ======================================================================================================================================
export const zDatabaseId = z.object({database_id: zId});
export type DatabaseId = z.infer<typeof zDatabaseId>;
