import type {
  Block as NBlock,
  BlockAudio as NBlockAudio,
  BlockBookmark as NBlockBookmark,
  BlockBreadcrumb as NBlockBreadcrumb,
  BlockBulletedListItem as NBlockBulletedListItem,
  BlockCallout as NBlockCallout,
  BlockChildDatabase as NBlockChildDatabase,
  BlockChildPage as NBlockChildPage,
  BlockCode as NBlockCode,
  BlockColumn as NBlockColumn,
  BlockColumnList as NBlockColumnList,
  BlockCommon as NBlockCommon,
  BlockDivider as NBlockDivider,
  BlockEmbed as NBlockEmbed,
  BlockEquation as NBlockEquation,
  BlockFile as NBlockFile,
  BlockHeading1 as NBlockHeading1,
  BlockHeading2 as NBlockHeading2,
  BlockHeading3 as NBlockHeading3,
  BlockImage as NBlockImage,
  BlockLinkPreview as NBlockLinkPreview,
  BlockLinkToPage as NBlockLinkToPage,
  BlockNumberedListItem as NBlockNumberedListItem,
  BlockParagraph as NBlockParagraph,
  BlockPdf as NBlockPdf,
  BlockQuote as NBlockQuote,
  BlockSyncedBlock as NBlockSyncedBlock,
  BlockTable as NBlockTable,
  BlockTableOfContents as NBlockTableOfContents,
  BlockTableRow as NBlockTableRow,
  BlockTemplate as NBlockTemplate,
  BlockToDo as NBlockToDo,
  BlockToggle as NBlockToggle,
  BlockUnsupported as NBlockUnsupported,
  BlockVideo as NBlockVideo,
  ListBlock as NListBlock,
} from '../schemas/input';
import {commonFrom, fileFrom, listCommonFrom, parentFrom} from './common';

// BLOCK ===================================================================================================================================
export function blockCommonFrom<B extends NBlockCommon>({has_children: hasChildren, object: _, parent, ...r}: B) {
  return commonFrom({...r, hasChildren, parent: parentFrom(parent)});
}

export function blockAudioFrom({audio, ...r}: NBlockAudio) {
  return blockCommonFrom({value: fileFrom(audio), ...r});
}

export function blockBookmarkFrom({bookmark: value, ...r}: NBlockBookmark) {
  return blockCommonFrom({value, ...r});
}

export function blockBreadcrumbFrom({breadcrumb: _, ...r}: NBlockBreadcrumb) {
  return blockCommonFrom(r);
}

export function blockBulletedListItemFrom({bulleted_list_item: value, ...r}: NBlockBulletedListItem) {
  return blockCommonFrom({value, ...r});
}

export function blockCalloutFrom({callout: value, ...r}: NBlockCallout) {
  return blockCommonFrom({value, ...r});
}

// CHILD DATABASE ==========================================================================================================================
export function blockChildDatabaseFrom({child_database: {title: value}, ...r}: NBlockChildDatabase) {
  return blockCommonFrom({value, ...r});
}
export type BlockChildDatabase = ReturnType<typeof blockChildDatabaseFrom>;

export function blockChildDatabaseValueFrom(nBlockChildDatabase: NBlockChildDatabase) {
  return blockChildDatabaseFrom(nBlockChildDatabase).value;
}

export function isBlockChildDatabase(block: Block): block is BlockChildDatabase;
export function isBlockChildDatabase(block: NBlock): block is NBlockChildDatabase;
export function isBlockChildDatabase(block: NBlock | Block) {
  return block.type === 'child_database';
}



// CHILD PAGE ==============================================================================================================================
export function blockChildPageFrom({child_page: {title: value}, ...r}: NBlockChildPage) {
  return blockCommonFrom({value, ...r});
}

// CODE ====================================================================================================================================
export function blockCodeFrom({code: value, ...r}: NBlockCode) {
  return blockCommonFrom({value, ...r});
}

export function blockColumnFrom({column: value, ...r}: NBlockColumn) {
  return blockCommonFrom({value, ...r});
}

export function blockColumnListFrom({column_list: value, ...r}: NBlockColumnList) {
  return blockCommonFrom({value, ...r});
}

export function blockDividerFrom({divider: _, ...r}: NBlockDivider) {
  return blockCommonFrom(r);
}

export function blockEmbedFrom({embed: {url: value}, ...r}: NBlockEmbed) {
  return blockCommonFrom({value, ...r});
}

export function blockEquationFrom({equation: {expression: value}, ...r}: NBlockEquation) {
  return blockCommonFrom({value, ...r});
}

export function blockFileFrom({file, ...r}: NBlockFile) {
  return blockCommonFrom({value: fileFrom(file), ...r});
}

export function blockHeading1From({heading_1: value, ...r}: NBlockHeading1) {
  return blockCommonFrom({value, ...r});
}

export function blockHeading2From({heading_2: value, ...r}: NBlockHeading2) {
  return blockCommonFrom({value, ...r});
}

export function blockHeading3From({heading_3: value, ...r}: NBlockHeading3) {
  return blockCommonFrom({value, ...r});
}

export function blockImageFrom({image, ...r}: NBlockImage) {
  return blockCommonFrom({value: fileFrom(image), ...r});
}

export function blockLinkPreviewFrom({link_preview: {url: value}, ...r}: NBlockLinkPreview) {
  return blockCommonFrom({value, ...r});
}

export function blockLinkToPageFrom({link_to_page: value, ...r}: NBlockLinkToPage) {
  return blockCommonFrom({value, ...r});
}

export function blockNumberedListItemFrom({numbered_list_item: value, ...r}: NBlockNumberedListItem) {
  return blockCommonFrom({value, ...r});
}

export function blockParagraphFrom({paragraph: value, ...r}: NBlockParagraph) {
  return blockCommonFrom({value, ...r});
}

export function blockPdfFrom({pdf, ...r}: NBlockPdf) {
  return blockCommonFrom({value: fileFrom(pdf), ...r});
}

export function blockQuoteFrom({quote: value, ...r}: NBlockQuote) {
  return blockCommonFrom({value, ...r});
}

export function blockSyncedBlockFrom({synced_block: value, ...r}: NBlockSyncedBlock) {
  return blockCommonFrom({value, ...r});
}

export function blockTableFrom({table: value, ...r}: NBlockTable) {
  return blockCommonFrom({value, ...r});
}

export function blockTableOfContentsFrom({table_of_contents: value, ...r}: NBlockTableOfContents) {
  return blockCommonFrom({value, ...r});
}

export function blockTableRowFrom({table_row: value, ...r}: NBlockTableRow) {
  return blockCommonFrom({value, ...r});
}

export function blockTemplateFrom({template: value, ...r}: NBlockTemplate) {
  return blockCommonFrom({value, ...r});
}

export function blockToDoFrom({to_do: value, ...r}: NBlockToDo) {
  return blockCommonFrom({value, ...r});
}

export function blockToggleFrom({toggle: value, ...r}: NBlockToggle) {
  return blockCommonFrom({value, ...r});
}

export function blockUnsupportedFrom({unsupported: _, ...r}: NBlockUnsupported) {
  return blockCommonFrom(r);
}

export function blockVideoFrom({video, ...r}: NBlockVideo) {
  return blockCommonFrom({value: fileFrom(video), ...r});
}

export function blockFrom<B extends NBlock>(block: B) {
  if (block.type === 'audio') return blockAudioFrom(block);
  if (block.type === 'bookmark') return blockBookmarkFrom(block);
  if (block.type === 'breadcrumb') return blockBreadcrumbFrom(block);
  if (block.type === 'bulleted_list_item') return blockBulletedListItemFrom(block);
  if (block.type === 'callout') return blockCalloutFrom(block);
  if (block.type === 'child_database') return blockChildDatabaseFrom(block);
  if (block.type === 'child_page') return blockChildPageFrom(block);
  if (block.type === 'code') return blockCodeFrom(block);
  if (block.type === 'column') return blockColumnFrom(block);
  if (block.type === 'column_list') return blockColumnListFrom(block);
  if (block.type === 'divider') return blockDividerFrom(block);
  if (block.type === 'embed') return blockEmbedFrom(block);
  if (block.type === 'equation') return blockEquationFrom(block);
  if (block.type === 'file') return blockFileFrom(block);
  if (block.type === 'heading_1') return blockHeading1From(block);
  if (block.type === 'heading_2') return blockHeading2From(block);
  if (block.type === 'heading_3') return blockHeading3From(block);
  if (block.type === 'image') return blockImageFrom(block);
  if (block.type === 'link_preview') return blockLinkPreviewFrom(block);
  if (block.type === 'link_to_page') return blockLinkToPageFrom(block);
  if (block.type === 'numbered_list_item') return blockNumberedListItemFrom(block);
  if (block.type === 'paragraph') return blockParagraphFrom(block);
  if (block.type === 'pdf') return blockPdfFrom(block);
  if (block.type === 'quote') return blockQuoteFrom(block);
  if (block.type === 'synced_block') return blockSyncedBlockFrom(block);
  if (block.type === 'table') return blockTableFrom(block);
  if (block.type === 'table_of_contents') return blockTableOfContentsFrom(block);
  if (block.type === 'table_row') return blockTableRowFrom(block);
  if (block.type === 'template') return blockTemplateFrom(block);
  if (block.type === 'to_do') return blockToDoFrom(block);
  if (block.type === 'toggle') return blockToggleFrom(block);
  if (block.type === 'unsupported') return blockUnsupportedFrom(block);
  if (block.type === 'video') return blockVideoFrom(block);
  throw new Error('unknown block type');
}
export type Block = ReturnType<typeof blockFrom>;

// LIST ====================================================================================================================================
export function listBlockFrom({block: _, results, type: __, ...r}: NListBlock) {
  return listCommonFrom({...r, results: results.map(blockFrom)});
}
