import {Client} from '@notionhq/client';
import {NotionToMarkdown} from 'notion-to-md';
import type {AnyContentRef, AnyDataRef, AnyRef, Collection, PageAny} from '../schemas';
import {blockChildDatabaseFrom, dataFrom, getPageTitle, isBlockChildDatabase, pageFrom} from '../utils';
import {createNotion, type CreateNotionParams} from './sdk';
import {safe} from './utils';

export function createNotionCms(params: CreateNotionCmsParams) {
  const notion = createNotion(params);
  const n2m = new NotionToMarkdown({notionClient: new Client({auth: params.auth})});

  async function entryFrom(collection: string, type: string, page: PageAny) {
    const [data, id] = [dataFrom(page), getPageTitle(page)];
    if (type === 'data') return {collection, data, id, type: 'data' as const};
    const {results} = await notion.unsafeFindBlockChildren({id: page.id});
    const bodyBlocks = await n2m.blocksToMarkdown(results);
    const {parent} = n2m.toMarkdownString(bodyBlocks);
    return {collection, body: parent ?? '', data, id: `${id}.md`, slug: id, type: 'content' as const};
  }

  async function unsafeFindCollection(collectionSlug: string) {
    const collections = await unsafeFindCollections();
    const collection = collections.find(({slug}) => slug === collectionSlug);
    if (!collection) throw new Error('undefinedCollection');
    return collection;
  }

  async function unsafeFindCollections() {
    const {results} = await notion.unsafeFindBlockChildren({id: params.pageId});
    const collectionsMap = new Map<string, Collection>();
    for (const {id, value} of results.filter(isBlockChildDatabase).map(blockChildDatabaseFrom)) {
      const [type, slug] = value.split(':');
      if (!slug || (type !== 'data' && type !== 'content')) continue;
      collectionsMap.set(slug, {ids: [...(collectionsMap.get(slug)?.ids ?? []), id], slug, type});
    }
    return [...collectionsMap.values()];
  }

  async function unsafeFindEntriesFromCollection({ids, slug: collection, type}: Collection) {
    const items = await Promise.all(ids.map((id) => notion.unsafeFindDatabaseItems({id})));
    return Promise.all(items.flatMap(({results}) => results.map((page) => entryFrom(collection, type, pageFrom(page)))));
  }

  async function unsafeFindEntriesFromCollections(collections: Collection[]) {
    const entries = await Promise.all(collections.flatMap(unsafeFindEntriesFromCollection));
    return entries.flat();
  }

  async function unsafeFindAllEntries() {
    const collections = await unsafeFindCollections();
    return unsafeFindEntriesFromCollections(collections);
  }

  async function unsafeFindCollectionEntries(collectionSlug: string) {
    const collection = await unsafeFindCollection(collectionSlug);
    return unsafeFindEntriesFromCollection(collection);
  }

  async function unsafeFindEntry(ref: AnyRef) {
    const dtos = await unsafeFindCollectionEntries(ref.collection);
    return dtos.find((dto) => (dto.type === 'data' ? dto.id === (ref as AnyDataRef).id : dto.slug === (ref as AnyContentRef).slug));
  }
  const findEntry = safe(unsafeFindEntry);

  async function unsafeFindEntries(refsOrCollectionSlug?: string | AnyRef[]) {
    if (refsOrCollectionSlug === undefined) return unsafeFindAllEntries();
    if (typeof refsOrCollectionSlug !== 'string') return Promise.all(refsOrCollectionSlug.map(unsafeFindEntry));
    return unsafeFindCollectionEntries(refsOrCollectionSlug);
  }
  const findEntries = safe(unsafeFindEntries);

  return {
    ...notion,
    findEntries,
    findEntry,
    unsafeFindEntries,
    unsafeFindEntry,
  };
}

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
export type CreateNotionCmsParams = CreateNotionParams & {pageId: string};
