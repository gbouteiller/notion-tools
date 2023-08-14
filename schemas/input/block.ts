import {D} from '@mobily/ts-belt';
import {z} from 'zod';
import {
  zColor,
  zCommon,
  zFile,
  zIcon,
  zId,
  zListCommon,
  zParentBlock,
  zParentDatabase,
  zParentPage,
  zParentWorkspace,
  zRichText,
} from './common';

// COMMON ==================================================================================================================================
export const zBlockCommon = z.object({
  ...zCommon.shape,
  has_children: z.boolean(),
  object: z.literal('block'),
  parent: z.union([zParentBlock, zParentDatabase, zParentPage, zParentWorkspace]),
});
export type BlockCommon = z.infer<typeof zBlockCommon>;

export const zBlockHeadingValue = z.object({color: zColor, rich_text: zRichText.array()});

export const zBlockParagraphValue = z.object({
  ...zBlockHeadingValue.shape,
  children: z.any().array().optional(),
}); //{children: zBlock.array()});

// AUDIO ===================================================================================================================================
export const zBlockAudio = z.object({...zBlockCommon.shape, audio: zFile, type: z.literal('audio')});
export type BlockAudio = z.infer<typeof zBlockAudio>;

// BOOKMARK ================================================================================================================================
export const zBlockBookmark = z.object({
  ...zBlockCommon.shape,
  bookmark: z.object({
    caption: zRichText.array(),
    url: z.string(),
  }),
  type: z.literal('bookmark'),
});
export type BlockBookmark = z.infer<typeof zBlockBookmark>;

// BREADCRUMB ==============================================================================================================================
export const zBlockBreadcrumb = z.object({...zBlockCommon.shape, breadcrumb: z.object({}), type: z.literal('breadcrumb')});
export type BlockBreadcrumb = z.infer<typeof zBlockBreadcrumb>;

// BULLETED LIST ITEM ======================================================================================================================
export const zBlockBulletedListItem = z.object({
  ...zBlockCommon.shape,
  bulleted_list_item: zBlockParagraphValue,
  type: z.literal('bulleted_list_item'),
});
export type BlockBulletedListItem = z.infer<typeof zBlockBulletedListItem>;

// CALLOUT =================================================================================================================================
export const zBlockCallout = z.object({
  ...zBlockCommon.shape,
  callout: z.object({
    ...zBlockParagraphValue.shape,
    icon: zIcon,
  }),
  type: z.literal('callout'),
});
export type BlockCallout = z.infer<typeof zBlockCallout>;

// CHILD DATABASE ==========================================================================================================================
export const zBlockChildDatabase = z.object({
  ...zBlockCommon.shape,
  child_database: z.object({
    title: z.string(),
  }),
  type: z.literal('child_database'),
});
export type BlockChildDatabase = z.infer<typeof zBlockChildDatabase>;

// CHILD PAGE ==============================================================================================================================
export const zBlockChildPage = z.object({
  ...zBlockCommon.shape,
  child_page: z.object({
    title: z.string(),
  }),
  type: z.literal('child_page'),
});
export type BlockChildPage = z.infer<typeof zBlockChildPage>;

// CODE ====================================================================================================================================
export const zBlockCode = z.object({
  ...zBlockCommon.shape,
  code: z.object({
    caption: zRichText.array(),
    language: z.string(),
    rich_text: zRichText.array(),
  }),
  type: z.literal('code'),
});
export type BlockCode = z.infer<typeof zBlockCode>;

// COLUMN ==================================================================================================================================
export const zBlockColumn = z.object({
  ...zBlockCommon.shape,
  column: z.object({
    children: z.any().array().optional(),
  }), //, children: zBlock.array()});,
  type: z.literal('column'),
});
export type BlockColumn = z.infer<typeof zBlockColumn>;

// COLUMN LIST =============================================================================================================================
export const zBlockColumnList = z.object({
  ...zBlockCommon.shape,
  column_list: z.object({
    children: z.any().array().optional(),
  }), //, children: zBlockColumnList.array()});,
  type: z.literal('column_list'),
});
export type BlockColumnList = z.infer<typeof zBlockColumnList>;

// DIVIDER =================================================================================================================================
export const zBlockDivider = z.object({...zBlockCommon.shape, divider: z.object({}), type: z.literal('divider')});
export type BlockDivider = z.infer<typeof zBlockDivider>;

// EMBED ===================================================================================================================================
export const zBlockEmbed = z.object({
  ...zBlockCommon.shape,
  embed: z.object({
    url: z.string(),
  }),
  type: z.literal('embed'),
});
export type BlockEmbed = z.infer<typeof zBlockEmbed>;

// EQUATION ================================================================================================================================
export const zBlockEquation = z.object({
  ...zBlockCommon.shape,
  equation: z.object({
    expression: z.string(),
  }),
  type: z.literal('equation'),
});
export type BlockEquation = z.infer<typeof zBlockEquation>;

// FILE ====================================================================================================================================
export const zBlockFile = z.object({...zBlockCommon.shape, file: zFile, type: z.literal('file')});
export type BlockFile = z.infer<typeof zBlockFile>;

// HEADINGS ================================================================================================================================
export const zBlockHeading1 = z.object({...zBlockCommon.shape, heading_1: zBlockHeadingValue, type: z.literal('heading_1')});
export type BlockHeading1 = z.infer<typeof zBlockHeading1>;

export const zBlockHeading2 = z.object({...zBlockCommon.shape, heading_2: zBlockHeadingValue, type: z.literal('heading_2')});
export type BlockHeading2 = z.infer<typeof zBlockHeading2>;

export const zBlockHeading3 = z.object({...zBlockCommon.shape, heading_3: zBlockHeadingValue, type: z.literal('heading_3')});
export type BlockHeading3 = z.infer<typeof zBlockHeading3>;

// IMAGE ===================================================================================================================================
export const zBlockImage = z.object({...zBlockCommon.shape, image: zFile, type: z.literal('image')});
export type BlockImage = z.infer<typeof zBlockImage>;

// LINK PREVIEW ============================================================================================================================
export const zBlockLinkPreview = z.object({
  ...zBlockCommon.shape,
  link_preview: z.object({
    url: z.string(),
  }),
  type: z.literal('link_preview'),
});
export type BlockLinkPreview = z.infer<typeof zBlockLinkPreview>;

// LINK TO PAGE ============================================================================================================================
export const zBlockLinkToPage = z.object({
  ...zBlockCommon.shape,
  link_to_page: z.union([
    z.object({page_id: zId, type: z.literal('page_id')}),
    z.object({database_id: zId, type: z.literal('database_id')}),
  ]),
  type: z.literal('link_to_page'),
});
export type BlockLinkToPage = z.infer<typeof zBlockLinkToPage>;

// NUMBERED LIST ITEM ======================================================================================================================
export const zBlockNumberedListItem = z.object({
  ...zBlockCommon.shape,
  numbered_list_item: zBlockParagraphValue,
  type: z.literal('numbered_list_item'),
});
export type BlockNumberedListItem = z.infer<typeof zBlockNumberedListItem>;

// PARAGRAPH ===============================================================================================================================
export const zBlockParagraph = z.object({...zBlockCommon.shape, paragraph: zBlockParagraphValue, type: z.literal('paragraph')});
export type BlockParagraph = z.infer<typeof zBlockParagraph>;

// PDF =====================================================================================================================================
export const zBlockPdf = z.object({...zBlockCommon.shape, pdf: zFile, type: z.literal('pdf')});
export type BlockPdf = z.infer<typeof zBlockPdf>;

// QUOTE ===================================================================================================================================
export const zBlockQuote = z.object({...zBlockCommon.shape, quote: zBlockParagraphValue, type: z.literal('quote')});
export type BlockQuote = z.infer<typeof zBlockQuote>;

// SYNCED BLOCK ============================================================================================================================
export const zBlockSyncedBlock = z.object({
  ...zBlockCommon.shape,
  synced_block: z.object({
    synced_from: z.null(),
    children: z.any().array().optional(),
  }), //, children: zBlock.array()});,
  type: z.literal('synced_block'),
});
export type BlockSyncedBlock = z.infer<typeof zBlockSyncedBlock>;

// TABLE ===================================================================================================================================
export const zBlockTable = z.object({
  ...zBlockCommon.shape,
  table: z.object({
    has_column_header: z.boolean(),
    has_row_header: z.boolean(),
    table_width: z.number().int(),
  }),
  type: z.literal('table'),
});
export type BlockTable = z.infer<typeof zBlockTable>;

// TABLE OF CONTENTS =======================================================================================================================
export const zBlockTableOfContents = z.object({...zBlockCommon.shape, table_of_contents: zColor, type: z.literal('table_of_contents')});
export type BlockTableOfContents = z.infer<typeof zBlockTableOfContents>;

// TABLE ROW ===============================================================================================================================
export const zBlockTableRow = z.object({
  ...zBlockCommon.shape,
  table_row: z.object({
    cells: zRichText.array().array(),
  }),
  type: z.literal('table_row'),
});
export type BlockTableRow = z.infer<typeof zBlockTableRow>;

// TEMPLATE ================================================================================================================================
export const zBlockTemplate = z.object({
  ...zBlockCommon.shape,
  template: z.object(D.deleteKey(zBlockParagraphValue.shape, 'color')),
  type: z.literal('template'),
});
export type BlockTemplate = z.infer<typeof zBlockTemplate>;

// TODO ====================================================================================================================================
export const zBlockToDo = z.object({
  ...zBlockCommon.shape,
  to_do: z.object({
    ...zBlockParagraphValue.shape,
    checked: z.boolean().optional(),
  }),
  type: z.literal('to_do'),
});
export type BlockToDo = z.infer<typeof zBlockToDo>;

// TOGGLE ==================================================================================================================================
export const zBlockToggle = z.object({...zBlockCommon.shape, toggle: zBlockParagraphValue, type: z.literal('toggle')});
export type BlockToggle = z.infer<typeof zBlockToggle>;

// UNSUPPORTED ==============================================================================================================================
export const zBlockUnsupported = z.object({...zBlockCommon.shape, type: z.literal('unsupported'), unsupported: z.object({})});
export type BlockUnsupported = z.infer<typeof zBlockUnsupported>;

// VIDEO ===================================================================================================================================
export const zBlockVideo = z.object({...zBlockCommon.shape, type: z.literal('video'), video: zFile});
export type BlockVideo = z.infer<typeof zBlockVideo>;

// MAIN ====================================================================================================================================
export const zBlock = z.union([
  zBlockAudio,
  zBlockBookmark,
  zBlockBreadcrumb,
  zBlockBulletedListItem,
  zBlockCallout,
  zBlockChildDatabase,
  zBlockChildPage,
  zBlockCode,
  zBlockColumn,
  zBlockColumnList,
  zBlockDivider,
  zBlockEmbed,
  zBlockEquation,
  zBlockFile,
  zBlockHeading1,
  zBlockHeading2,
  zBlockHeading3,
  zBlockImage,
  zBlockLinkPreview,
  zBlockLinkToPage,
  zBlockNumberedListItem,
  zBlockParagraph,
  zBlockPdf,
  zBlockQuote,
  zBlockSyncedBlock,
  zBlockTable,
  zBlockTableOfContents,
  zBlockTableRow,
  zBlockTemplate,
  zBlockToDo,
  zBlockToggle,
  zBlockUnsupported,
  zBlockVideo,
]);
export type Block = z.infer<typeof zBlock>;

// ID ======================================================================================================================================
export const zBlockId = z.object({block_id: zId});
export type BlockId = z.infer<typeof zBlockId>;

// LIST ====================================================================================================================================
export const zListBlock = z.object({
  ...zListCommon.shape,
  block: z.object({}),
  results: zBlock.array(),
  type: z.literal('block'),
});
export type ListBlock = z.infer<typeof zListBlock>;
